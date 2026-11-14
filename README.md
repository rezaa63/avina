# avina

وب‌سایت معرفی و نمونه‌کار فارسی برای برند **FastWeb96** و طراح **rezaakbari**. رابط سایت HTML/CSS/JavaScript/SVG/WebP استاتیک است و روی GitHub Pages می‌ماند. برای فرم سفارش یک relay کوچک Node.js روی Manus به Telegram Bot API اضافه شده است. دیتابیس وجود ندارد؛ دادهٔ فرم فقط به گفت‌وگوی Telegram مقصد فرستاده می‌شود. Bot Token و Chat ID فقط در environment سمت سرور نگهداری می‌شوند.

## ساختار پروژه

```text
avina/
├── app.config.ts
├── Dockerfile
├── index.html
├── README.md
├── ASSET_SOURCES.md
├── plan.md
├── TODO.md
├── .gitignore
├── manus-routes.json
├── server.js
└── assets/
    ├── css/style.css
    ├── js/main.js
    ├── images/
    │   ├── hero/.gitkeep
    │   ├── services/
    │   ├── portfolio/
    │   └── icons/favicon.svg
    └── fonts/.gitkeep
```

`index.html` صفحهٔ اصلی، metadata و محتوای معنایی را در خود دارد. استایل و رفتار در `assets/css/style.css` و `assets/js/main.js` قرار دارند. `server.js` API فرم را اعتبارسنجی می‌کند، CORS را به مبدأ مجاز محدود می‌سازد و متن درخواست را بدون ذخیره‌سازی سمت‌سرور به Telegram می‌فرستد. `Dockerfile` اجرای همین API را برای استقرار Manus تعریف می‌کند. `app.config.ts` فقط metadata لوگوی پروژهٔ Manus را نگه می‌دارد. `plan.md` و `TODO.md` تصمیم‌ها و وضعیت پروژه‌اند؛ `ASSET_SOURCES.md` منابع عکس‌ها و یادداشت حقوق استفاده را فهرست می‌کند. تصاویر سرویس‌ها و نمونه‌کارها در پوشه‌های جداگانه‌اند تا به‌سادگی تعویض شوند. فونت Vazirmatn در صورت اتصال به اینترنت از Google Fonts بارگذاری می‌شود؛ در صورت قطع آن، فونت‌های سیستمی فارسی fallback هستند.

## اجرای محلی

برای اجرای کامل سایت و endpoint محلی، Node.js 22 یا بالاتر را نیاز دارید. توکن را در source ننویسید؛ متغیرها را فقط در shell محلی تنظیم کنید:

```bash
export TELEGRAM_BOT_TOKEN='توکن-محلی-خودتان'
export TELEGRAM_CHAT_ID='شناسه-گفت‌وگوی-خودتان'
node server.js
```

سپس در مرورگر `http://localhost:3000/` را باز کنید. server فایل‌های استاتیک را برای توسعه ارائه می‌دهد و endpoint سفارش در `/api/order` است. این API بدون هر دو متغیر Telegram پاسخ ارسال نمی‌دهد.

## انتشار با GitHub Pages

این پروژه برای repository عمومی [rezaa63/avina](https://github.com/rezaa63/avina) آماده شده است. مخزن از branch `main` و پوشهٔ ریشه (`/`) سرو می‌شود و Pages به build یا workflow جداگانه نیاز ندارد.

برای تنظیم یا بررسی انتشار frontend در GitHub، به **Settings → Pages** بروید. در **Build and deployment** گزینهٔ **Deploy from a branch**، branch `main` و پوشهٔ `/ (root)` را انتخاب کنید. نشانی frontend: <https://rezaa63.github.io/avina/>. API زندهٔ Manus در نشانی <https://fastweb96-m2vkzxu7.manus.space/api/order> قرار دارد و مقدار `SITE_CONFIG.orderApiEndpoint` در بالای `assets/js/main.js` همین URL را نگه می‌دارد. سرور فقط به pathهای `/api/*` و `/health` route می‌شود؛ فایل‌های سایت همچنان از GitHub Pages می‌آیند.

Canonical، Open Graph و JSON-LD در `index.html` از قبل به نشانی واقعی `https://rezaa63.github.io/avina/` اشاره می‌کنند. اگر مخزن به مالک دیگری منتقل شد یا دامنهٔ سفارشی اضافه شد، canonical، `og:url`، `og:image` و فیلد `url` در structured data را هم‌زمان به‌روزرسانی کنید. پیوندهای شبکه‌های اجتماعی به profileهای مشخص‌شدهٔ `@fastweb96` و `fastweb9696` وصل‌اند. همهٔ مسیرهای فایل‌های داخلی نسبی و با `./` آغاز می‌شوند تا وب‌سایت در زیرمسیر repository هم درست کار کند.

## ویرایش محتوا و تنظیمات

- **متن‌ها:** محتوای بخش‌ها مستقیماً در `index.html` است. ساختار headingها، label فیلدها و metadata را متناسب با محتوا حفظ کنید.
- **شماره تماس:** مقدار `phone` در شیء `SITE_CONFIG` در بالای `assets/js/main.js` را تغییر دهید. شمارهٔ نمایش‌داده‌شدهٔ HTML نیز در همان فایل در بخش contact و footer نوشته شده؛ بعد از ویرایش، همهٔ محل‌ها و لینک‌های `tel:` را بررسی کنید.
- **لینک شبکه‌های اجتماعی:** آرایهٔ `socials` در بالای `assets/js/main.js` را تغییر دهید. لینک‌های فعلی Telegram، Rubika و Bale برای `fastweb96` و لینک Instagram برای `fastweb9696` تنظیم شده‌اند. WhatsApp عمداً استفاده نشده است.
- **واترمارک و اعتبار طراح:** رشتهٔ `rezaakbari` در `SITE_CONFIG.designer` و متن‌های ثابت HTML قرار دارد. کلاس مستقل `.personal-watermark` در CSS اندازه، رنگ، opacity و موقعیت watermarkها را کنترل می‌کند؛ متن watermark روی Portfolio از تنظیم JS ساخته می‌شود. عبارت Footer را با حفظ فرمت `Designed by rezaakbari` ویرایش کنید.
- **تصاویر:** فایل‌ها WebP هستند. برای سرویس‌ها، فایل‌های همنام در `assets/images/services/` را جایگزین کنید و ابعاد/قاب را در CSS تنظیم کنید. برای کارت‌های Portfolio، تصاویر را در `assets/images/portfolio/` بگذارید، سپس مسیر و متن جایگزین را در آرایهٔ `projects` داخل `assets/js/main.js` به‌روزرسانی کنید. فایل جدید را فشرده کنید و `alt` توصیفی و دقیق بنویسید. تصاویر موجود نمونهٔ نمایشی‌اند؛ منبع و وضعیت مجوز آن‌ها در `ASSET_SOURCES.md` درج شده است. پیش از استفادهٔ تجاری، مجوز و حقوق انتشار را بررسی کنید یا تصاویر دارای مجوز خود را جایگزین کنید.
- **افزودن Portfolio:** در آرایهٔ `projects` در `main.js` یک شیء با `name`, `category`, `key`, `description`, `image`, `alt` اضافه کنید؛ تصویر متناظر را در `assets/images/portfolio/` ذخیره و فیلتر `data-filter` متناظر را در `index.html` اضافه کنید. شمارنده به‌صورت خودکار تعداد موارد قابل‌مشاهده را نشان می‌دهد؛ متن ثابت `۰۶ پروژه` بالای لیست در HTML را می‌توان حذف یا با متن راهنما جایگزین کرد.
- **شهادت مشتریان:** سه کارت بخش نظرات در `index.html` متن نمونه هستند. عبارت‌های نام، متن و عنوان هرکارت را با بازخورد واقعی و دارای اجازهٔ انتشار عوض کنید.
- **فرم سفارش و Telegram:** فرم نام، تلفن، نوع کسب‌وکار، نوع وب‌سایت و توضیحات را به API سرور Manus می‌فرستد. سرور ورودی را دوباره اعتبارسنجی و با `sendMessage` از [Telegram Bot API](https://core.telegram.org/bots/api) ارسال می‌کند؛ برای گیرنده، Bot Token و Chat ID باید از طریق ورودی امن Webdev تنظیم شده باشند. در Telegram با [راهنمای رسمی BotFather](https://core.telegram.org/bots/tutorial) bot بسازید، سپس گفت‌وگوی bot را با `/start` آغاز کنید؛ تا زمانی که bot را شروع نکرده‌اید، ارسال به گفت‌وگوی خصوصی ممکن است شکست بخورد. توکن را در chat، فایل source، `main.js`, HTML، Git یا log ننویسید. سایت داده را در دیتابیس یا فایل ذخیره نمی‌کند؛ ماندگاری طبق تنظیمات Telegram در گفت‌وگوی مقصد است.
- **Canonical، OG و favicon:** عنوان و توضیح SEO در `<head>` فایل `index.html` هستند. URLها برای `rezaa63/avina` تنظیم شده‌اند. نشان SVG در `assets/images/icons/favicon.svg` قابل‌تعویض است.

## نکتهٔ دسترسی و حرکت

منوی موبایل، فیلترهای Portfolio و فرم با JavaScript کنترل می‌شوند. برای کاهش حرکت سیستم، وب‌سایت به `prefers-reduced-motion` احترام می‌گذارد. تصاویر غیرضروری lazy-load هستند؛ تصاویر بالای صفحه را در صورت نیاز بهینه کنید تا بارگذاری اولیه سبک بماند.
