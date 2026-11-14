(() => {
  "use strict";

  const SITE_CONFIG = Object.freeze({
    phone: "09211237543",
    designer: "rezaakbari",
    // Replace each homepage URL with the real profile URL before publishing.
    socials: [
      {
        key: "telegram",
        label: "تلگرام",
        href: "https://t.me/fastweb96",
        icon: '<path d="m21 4-3.1 15.2c-.2 1.1-.8 1.3-1.7.8l-4.6-3.4-2.2 2.1c-.2.2-.4.4-.8.4l.3-4.7L17.4 8c.4-.4-.1-.6-.6-.3L7 14l-4.5-1.4c-1-.3-1-1 .2-1.4L20 5c.9-.3 1.6.2 1.3 1Z" class="social-fill"/>',
      },
      {
        key: "instagram",
        label: "اینستاگرام",
        href: "https://www.instagram.com/fastweb9696/",
        icon: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.6 6.5h.01"/>',
      },
      {
        key: "rubika",
        label: "روبیکا",
        href: "https://rubika.ir/fastweb96",
        icon: '<path d="m5 7 7-4 7 4v10l-7 4-7-4z"/><path d="m9 10 6 4m0-4-6 4"/>',
      },
      {
        key: "bale",
        label: "بله",
        href: "https://ble.ir/fastweb96",
        icon: '<path d="M5 5.5h14v10H11l-4 3v-3H5z"/><path d="M9 9h6m-6 3h4"/>',
      },
    ],
  });

  const projects = [
    {
      name: "خانهٔ آتریوم",
      category: "املاک",
      key: "realestate",
      description: "تجربهٔ جست‌وجوی خانه در فضایی روشن و معاصر.",
      image: "./assets/images/portfolio/villa.webp",
      alt: "خانهٔ معاصر برای پروژهٔ مفهومی املاک",
    },
    {
      name: "گالری دنا",
      category: "خودرو",
      key: "auto",
      description: "نمایش خودرو و مشخصات در یک چیدمان دقیق.",
      image: "./assets/images/portfolio/dena-plus.webp",
      alt: "خودروی دنا پلاس در پروژهٔ مفهومی نمایشگاه خودرو",
    },
    {
      name: "استودیو آرک",
      category: "دکوراسیون",
      key: "interior",
      description: "روایت تصویری پروژه‌های یک استودیوی طراحی داخلی.",
      image: "./assets/images/portfolio/interior.webp",
      alt: "فضای داخلی معاصر برای پروژهٔ مفهومی دکوراسیون",
    },
    {
      name: "روژ اسکین",
      category: "زیبایی",
      key: "beauty",
      description: "معرفی خدمات زیبایی با حس آرام و لوکس.",
      image: "./assets/images/portfolio/beauty.webp",
      alt: "سالن زیبایی لوکس برای پروژهٔ مفهومی",
    },
    {
      name: "اِسنت استور",
      category: "فروشگاهی",
      key: "shop",
      description: "ویترین آنلاین محصولات مراقبت از پوست.",
      image: "./assets/images/portfolio/shop.webp",
      alt: "محصول مراقبت پوست برای پروژهٔ فروشگاهی مفهومی",
    },
    {
      name: "کافهٔ هشت",
      category: "کافه",
      key: "cafe",
      description: "منو و فضای کافه در تجربه‌ای یکپارچه.",
      image: "./assets/images/portfolio/cafe.webp",
      alt: "فضای کافهٔ معاصر برای پروژهٔ مفهومی",
    },
  ];

  document.documentElement.classList.add("js");

  const phoneHref = `tel:${SITE_CONFIG.phone}`;
  document.querySelectorAll("[data-phone-link]").forEach((link) => {
    link.setAttribute("href", phoneHref);
    if (!link.textContent.includes(SITE_CONFIG.phone))
      link.textContent = SITE_CONFIG.phone;
  });

  const socialMarkup = SITE_CONFIG.socials
    .map(
      ({ key, label, href, icon }) =>
        `<a class="social-link" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${label} FastWeb96" data-social="${key}"><svg viewBox="0 0 24 24" aria-hidden="true">${icon}</svg></a>`,
    )
    .join("");
  document.querySelectorAll(".social-links").forEach((container) => {
    container.innerHTML = socialMarkup;
  });

  const year = document.getElementById("current-year");
  if (year)
    year.textContent = new Intl.NumberFormat("fa-IR").format(
      new Date().getFullYear(),
    );

  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.getElementById("primary-menu");
  const closeMenu = () => {
    if (!menuButton || !menu) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "باز کردن فهرست");
    menu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };
  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute(
        "aria-label",
        open ? "بستن فهرست" : "باز کردن فهرست",
      );
      menu.classList.toggle("is-open", open);
      document.body.classList.toggle(
        "menu-open",
        open && window.matchMedia("(max-width: 820px)").matches,
      );
    });
    menu
      .querySelectorAll("a")
      .forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
    document.addEventListener("click", (event) => {
      if (
        menuButton.getAttribute("aria-expanded") === "true" &&
        !menu.contains(event.target) &&
        !menuButton.contains(event.target)
      )
        closeMenu();
    });
    window.addEventListener(
      "resize",
      () => {
        if (!window.matchMedia("(max-width: 820px)").matches) closeMenu();
      },
      { passive: true },
    );
  }

  const portfolioGrid = document.getElementById("portfolio-grid");
  const count = document.getElementById("portfolio-count");
  if (portfolioGrid) {
    portfolioGrid.innerHTML = projects
      .map(
        (project, index) => `
      <article class="portfolio-card tilt-card reveal" data-category="${project.key}" data-tilt>
        <div class="portfolio-media"><img src="${project.image}" alt="${project.alt}" loading="lazy" decoding="async"><span class="personal-watermark">${SITE_CONFIG.designer}</span><div class="portfolio-overlay"><span class="portfolio-category">${project.category}</span><span class="portfolio-quick" aria-hidden="true">↗</span></div></div>
        <div class="portfolio-info"><div class="portfolio-info-top"><h3>${project.name}</h3><span class="portfolio-index">0${index + 1} / 06</span></div><p>${project.description}</p><a class="portfolio-view" href="#featured-project" aria-label="مشاهدهٔ معرفی پروژهٔ ${project.name}"><span>View Project</span><span aria-hidden="true">←</span></a></div>
      </article>`,
      )
      .join("");

    const revealNewCards = () => {
      if (
        !("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        portfolioGrid
          .querySelectorAll(".reveal")
          .forEach((card) => card.classList.add("is-visible"));
        return;
      }
      portfolioGrid
        .querySelectorAll(".reveal:not(.is-visible)")
        .forEach((card) => revealObserver.observe(card));
    };

    document.querySelectorAll(".filter-button").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".filter-button").forEach((item) => {
          const active = item === button;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        const filter = button.dataset.filter;
        let visibleCount = 0;
        portfolioGrid.querySelectorAll(".portfolio-card").forEach((card) => {
          const visible = filter === "all" || card.dataset.category === filter;
          card.hidden = !visible;
          if (visible) visibleCount += 1;
        });
        if (count)
          count.textContent = `${new Intl.NumberFormat("fa-IR").format(visibleCount)} پروژه`;
        revealNewCards();
      });
    });
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const revealObserver =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
              }
            });
          },
          { rootMargin: "0px 0px -45px 0px", threshold: 0.08 },
        )
      : null;

  if (reducedMotion || !revealObserver) {
    document
      .querySelectorAll(".reveal")
      .forEach((element) => element.classList.add("is-visible"));
  } else {
    document
      .querySelectorAll(".reveal")
      .forEach((element) => revealObserver.observe(element));
  }

  if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      let frame = 0;
      card.addEventListener("pointermove", (event) => {
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const box = card.getBoundingClientRect();
          const x = (event.clientX - box.left) / box.width;
          const y = (event.clientY - box.top) / box.height;
          card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 3}deg) rotateY(${(x - 0.5) * 4}deg) translateY(-2px)`;
        });
      });
      card.addEventListener("pointerleave", () => {
        if (frame) cancelAnimationFrame(frame);
        card.style.transform = "";
      });
    });

    const hero = document.querySelector("[data-parallax-container]");
    if (hero) {
      let frame = 0;
      hero.addEventListener("pointermove", (event) => {
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const rect = hero.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          hero.querySelectorAll(".parallax-layer").forEach((layer) => {
            const depth = Number(layer.dataset.depth || 0.1);
            layer.style.translate = `${x * depth * -35}px ${y * depth * -29}px`;
          });
        });
      });
      hero.addEventListener("pointerleave", () => {
        if (frame) cancelAnimationFrame(frame);
        hero.querySelectorAll(".parallax-layer").forEach((layer) => {
          layer.style.translate = "";
        });
      });
    }
  }

  const showcaseStage = document.querySelector(".showcase-stage");
  if (showcaseStage && !reducedMotion) {
    let scrollFrame = 0;
    const updateShowcaseDepth = () => {
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const bounds = showcaseStage.getBoundingClientRect();
        const progress = Math.max(
          -0.8,
          Math.min(
            0.8,
            (window.innerHeight * 0.5 - (bounds.top + bounds.height * 0.5)) /
              window.innerHeight,
          ),
        );
        showcaseStage
          .querySelectorAll(".stage-window[data-depth]")
          .forEach((layer) => {
            const depth = Number(layer.dataset.depth || 0.1);
            layer.style.translate = `0 ${(progress * depth * 72).toFixed(1)}px`;
          });
      });
    };
    window.addEventListener("scroll", updateShowcaseDepth, { passive: true });
    window.addEventListener("resize", updateShowcaseDepth, { passive: true });
    updateShowcaseDepth();
  }

  const form = document.getElementById("order-form");
  const feedback = document.getElementById("form-feedback");
  if (form && feedback) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      feedback.innerHTML = `اطلاعات فقط در این صفحه بررسی شد و ارسال یا ذخیره نشده است. برای ادامه، با شمارهٔ <a href="${phoneHref}">${SITE_CONFIG.phone}</a> تماس بگیرید.`;
      feedback.classList.add("is-visible");
    });
  }
})();
