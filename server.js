"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const PORT = Number(process.env.PORT || 3000);
const ROOT = path.resolve(process.env.STATIC_DIR || process.cwd());
const BODY_LIMIT = 8 * 1024;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const RATE_SALT = crypto.randomBytes(32);
const rateBuckets = new Map();
const productionOrigins = new Set(
  (process.env.ALLOWED_ORIGINS || "https://rezaa63.github.io")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
);

if (process.env.NODE_ENV !== "production") {
  [
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ].forEach((origin) => productionOrigins.add(origin));
}

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".js", "application/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
]);

function sendJson(response, status, payload, extraHeaders = {}) {
  response.writeHead(status, {
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
    ...extraHeaders,
  });
  response.end(JSON.stringify(payload));
}

function allowedOrigin(request, response) {
  const origin = request.headers.origin;
  if (!origin || !productionOrigins.has(origin)) return false;
  response.setHeader("Access-Control-Allow-Origin", origin);
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Access-Control-Max-Age", "600");
  response.setHeader("Vary", "Origin");
  return true;
}

function addressKey(request) {
  const forwarded = request.headers["x-forwarded-for"];
  const address =
    (typeof forwarded === "string" ? forwarded.split(",")[0] : "") ||
    request.socket.remoteAddress ||
    "unknown";
  return crypto
    .createHmac("sha256", RATE_SALT)
    .update(address.trim())
    .digest("hex");
}

function isRateLimited(request) {
  const now = Date.now();
  for (const [key, bucket] of rateBuckets) {
    if (bucket.expiresAt <= now) rateBuckets.delete(key);
  }
  if (rateBuckets.size > 10000) rateBuckets.clear();

  const key = addressKey(request);
  const bucket = rateBuckets.get(key);
  if (!bucket || bucket.expiresAt <= now) {
    rateBuckets.set(key, { count: 1, expiresAt: now + RATE_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT;
}

function cleanSingleLine(value, maxLength) {
  if (typeof value !== "string") return null;
  const cleaned = value.replace(/[\u0000-\u001f\u007f]/g, " ").trim();
  return cleaned.length <= maxLength ? cleaned : null;
}

function cleanDetails(value) {
  if (value === undefined || value === null || value === "") return "";
  if (typeof value !== "string") return null;
  const cleaned = value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim();
  return cleaned.length <= 1200 ? cleaned : null;
}

function validatePayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload))
    return null;
  if (typeof payload.website === "string" && payload.website.trim())
    return { honeypot: true };

  const name = cleanSingleLine(payload.name, 80);
  const phone = cleanSingleLine(payload.phone, 24);
  const business = cleanSingleLine(payload.business || "", 80);
  const siteType = cleanSingleLine(payload.siteType || "", 80);
  const details = cleanDetails(payload.details);
  if (
    !name ||
    name.length < 2 ||
    !phone ||
    !/^[+0-9۰-۹٠-٩()\-\s]{8,24}$/.test(phone)
  )
    return null;
  if (business === null || siteType === null || details === null) return null;

  return { name, phone, business, siteType, details };
}

async function readJson(request) {
  const contentType = request.headers["content-type"] || "";
  if (!/^application\/json(?:\s*;|\s*$)/i.test(contentType)) {
    const error = new Error("content_type");
    error.status = 415;
    throw error;
  }

  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > BODY_LIMIT) {
      const error = new Error("body_limit");
      error.status = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    const error = new Error("invalid_json");
    error.status = 400;
    throw error;
  }
}

function buildTelegramText(order) {
  const lines = [
    "درخواست جدید وب‌سایت FastWeb96",
    "",
    `نام: ${order.name}`,
    `شماره تماس: ${order.phone}`,
    `نوع کسب‌وکار: ${order.business || "ذکر نشده"}`,
    `نوع وب‌سایت: ${order.siteType || "ذکر نشده"}`,
  ];
  if (order.details) lines.push("", "توضیحات پروژه:", order.details);
  return lines.join("\n").slice(0, 3500);
}

async function deliverToTelegram(order) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (
    !token ||
    !/^\d+:[A-Za-z0-9_-]+$/.test(token) ||
    !chatId ||
    !/^(?:-?\d+|@[A-Za-z0-9_]{5,32})$/.test(chatId)
  ) {
    return { ok: false, status: 503 };
  }

  let response;
  try {
    response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildTelegramText(order),
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    return { ok: false, status: 502 };
  }

  if (!response.ok) return { ok: false, status: 502 };
  try {
    const result = await response.json();
    return result && result.ok === true
      ? { ok: true }
      : { ok: false, status: 502 };
  } catch {
    return { ok: false, status: 502 };
  }
}

function serveStatic(request, response, pathname) {
  const decoded = decodeURIComponent(pathname);
  const relativePath =
    decoded === "/" ? "index.html" : decoded.replace(/^\/+/, "");
  if (relativePath.split(/[\\/]/).some((part) => part.startsWith("."))) {
    sendJson(response, 404, { ok: false });
    return;
  }
  const filePath = path.resolve(ROOT, relativePath);
  if (filePath !== ROOT && !filePath.startsWith(`${ROOT}${path.sep}`)) {
    sendJson(response, 404, { ok: false });
    return;
  }
  fs.stat(filePath, (statError, stats) => {
    const target =
      !statError && stats.isDirectory()
        ? path.join(filePath, "index.html")
        : filePath;
    fs.readFile(target, (readError, contents) => {
      if (readError) {
        sendJson(response, 404, { ok: false });
        return;
      }
      const contentType =
        mimeTypes.get(path.extname(target).toLowerCase()) ||
        "application/octet-stream";
      response.writeHead(200, {
        "Cache-Control": "no-store",
        "Content-Length": contents.length,
        "Content-Type": contentType,
        "X-Content-Type-Options": "nosniff",
      });
      response.end(contents);
    });
  });
}

const server = http.createServer(async (request, response) => {
  let pathname;
  try {
    pathname = new URL(request.url, "http://localhost").pathname;
  } catch {
    sendJson(response, 400, { ok: false, message: "درخواست نامعتبر است." });
    return;
  }

  if (pathname === "/health" && request.method === "GET") {
    sendJson(response, 200, { ok: true });
    return;
  }

  if (pathname === "/api/order" && request.method === "OPTIONS") {
    if (!allowedOrigin(request, response)) {
      sendJson(response, 403, { ok: false, message: "مبدأ مجاز نیست." });
      return;
    }
    response.writeHead(204, { "Cache-Control": "no-store" });
    response.end();
    return;
  }

  if (pathname === "/api/order" && request.method === "POST") {
    if (!allowedOrigin(request, response)) {
      sendJson(response, 403, {
        ok: false,
        message: "ارسال از این مبدأ مجاز نیست.",
      });
      return;
    }
    if (isRateLimited(request)) {
      sendJson(response, 429, {
        ok: false,
        message: "تعداد درخواست‌ها زیاد است؛ کمی بعد دوباره تلاش کنید.",
      });
      return;
    }

    let payload;
    try {
      payload = await readJson(request);
    } catch (error) {
      sendJson(
        response,
        error.status || 400,
        { ok: false, message: "اطلاعات ارسالی معتبر نیست." },
        {
          "Access-Control-Allow-Origin": request.headers.origin,
          Vary: "Origin",
        },
      );
      return;
    }
    const order = validatePayload(payload);
    if (order && order.honeypot) {
      sendJson(
        response,
        200,
        { ok: true },
        {
          "Access-Control-Allow-Origin": request.headers.origin,
          Vary: "Origin",
        },
      );
      return;
    }
    if (!order) {
      sendJson(
        response,
        422,
        { ok: false, message: "لطفاً نام و شمارهٔ تماس معتبر وارد کنید." },
        {
          "Access-Control-Allow-Origin": request.headers.origin,
          Vary: "Origin",
        },
      );
      return;
    }

    const delivered = await deliverToTelegram(order);
    if (!delivered.ok) {
      sendJson(
        response,
        delivered.status,
        {
          ok: false,
          message:
            "ارسال درخواست اکنون ممکن نیست؛ لطفاً کمی بعد دوباره تلاش کنید.",
        },
        {
          "Access-Control-Allow-Origin": request.headers.origin,
          Vary: "Origin",
        },
      );
      return;
    }
    sendJson(
      response,
      200,
      { ok: true, message: "درخواست شما به تلگرام ارسال شد." },
      { "Access-Control-Allow-Origin": request.headers.origin, Vary: "Origin" },
    );
    return;
  }

  if (request.method === "GET" || request.method === "HEAD") {
    serveStatic(request, response, pathname);
    return;
  }
  sendJson(response, 404, { ok: false, message: "مسیر پیدا نشد." });
});

server.headersTimeout = 15000;
server.requestTimeout = 15000;
server.listen(PORT, "0.0.0.0");
