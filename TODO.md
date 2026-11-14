# FastWeb96 — وضعیت تحویل

تمام موارد زیر با بازبینی کد و مرورگر تکمیل شده‌اند. آزمون نهایی شامل breakpointهای 320 تا 1365 پیکسل، مسیرهای asset محلی، فرم بدون POST، فیلترها، منوی موبایل، reduced motion و manifest است.

## ساختار ایستا، هویت و راه‌اندازی — تکمیل

- [x] پروژه با `index.html` در ریشه، `README.md`، `.gitignore` و ساختار `assets/css/`, `assets/js/`, `assets/images/hero/`, `services/`, `portfolio/`, `icons/`, `fonts/` ساخته شود.
- [x] تنها HTML5/CSS3/JavaScript/SVG/WebP و در صورت نیاز JSON استفاده شود؛ PHP، MySQL، Backend، Node server، Database، API/Secret و سرویس پولی/کتابخانهٔ سنگین وجود نداشته باشد.
- [x] تمام مسیرهای داخلی نسبی باشند (`./assets/...`)، نه `/assets/...`؛ سایت بدون build step روی GitHub Pages و مسیر `/avina/` اجراشدنی باشد.
- [x] برند اصلی `FastWeb96`، زبان فارسی، `lang="fa" dir="rtl"`، فونت Vazirmatn/Vazir یا fallback و شخصیت شخصی `rezaakbari` فقط به‌عنوان watermark باشد.

## صحنهٔ Hero، ناوبری و امضای بصری — تکمیل

- [x] طراحی Premium/Futuristic/3D/Cinematic با dark luxury، glassmorphism، depth، panelهای شناور، perspective، shadow، grid، نور محیطی آبی و accent طلایی پیاده شود؛ پس‌زمینه مشکی ساده نباشد.
- [x] Hero تمام‌صفحه با سیستم لپ‌تاپ/مانیتور و موبایل سه‌بعدی، پنل UI/نمودار، نور/shadow/perspective و parallax ملایم pointer داشته باشد.
- [x] عنوان «طراحی وب‌سایت‌هایی که فقط دیده نمی‌شوند؛ تجربه می‌شوند.»، متن «طراحی و توسعه وب‌سایت‌های مدرن، حرفه‌ای و اختصاصی برای برندهایی که می‌خواهند متفاوت دیده شوند.» و CTAهای «مشاهده نمونه‌کارها» و «ثبت سفارش» ارائه شوند.
- [x] Navigation glass شناور با خانه، درباره من، خدمات، نمونه‌کارها، فرآیند همکاری، تماس و CTA ثبت سفارش؛ در موبایل hamburger با رفتار دسترس‌پذیر.
- [x] کلاس مستقل `.personal-watermark` برای `rezaakbari`، lowercase، opacity پایین و قابل‌تنظیم داشته باشد؛ در Hero، Portfolio، حداقل یک پس‌زمینه و Footer دیده شود؛ Portfolio تصاویر نیز watermark ظریف داشته باشند.

## درباره، خدمات و پروژهٔ نمایشی — تکمیل

- [x] بخش «درباره FastWeb96» متن معرفی brief و کارت مهارت‌های Web Design، UI/UX Design، WordPress، Elementor، Responsive Design و Creative Front-End Development داشته باشد.
- [x] شش کارت تصویردار/آیکون‌دار با توضیح کوتاه و hover 3D/tilt و نورپردازی: سایت املاک، نمایشگاه خودرو، دکوراسیون داخلی، سالن زیبایی، محصولات بهداشتی و آرایشی، کافه و رستوران؛ نمایشگاه خودرو حتماً تصویر واقعی دنا پلاس داشته باشد.
- [x] بخش 3D Service Showcase با browser/mobile mockupهای چندگانه، scroll parallax و تغییر depth داشته باشد؛ انیمیشن performance friendly باشد.
- [x] Portfolio شیشه‌ای/masonry با فیلترهای همه، املاک، خودرو، دکوراسیون، زیبایی، فروشگاهی و کافه داشته باشد؛ هر پروژه local image، نام، دسته‌بندی، توضیح و `View Project` داشته باشد؛ تصاویر در `assets/images/portfolio/` قابل‌تعویض باشند؛ tilt، zoom، overlay، reflection، shadow و animation نرم داشته باشد.
- [x] «پروژه منتخب» desktop/mobile mockup، Browser UI و perspective سه‌بعدی، توضیح، technology، زمان اجرا و CTA مشاهده پروژه داشته باشد.

## اعتماد، همکاری، بازخورد و تماس — تکمیل

- [x] چهار کارت «طراحی اختصاصی»، «تجربه کاربری حرفه‌ای»، «کاملاً Responsive»، «ساختار قابل توسعه» نمایش داده شوند.
- [x] timeline همکاری با reveal هنگام scroll شامل 01 تحلیل نیازها، 02 طراحی اولیه، 03 توسعه، 04 تست و بهینه‌سازی، 05 تحویل.
- [x] سه کارت testimonial با متن ساده و قابل ویرایش در فایل‌های پروژه.
- [x] بخش «شروع یک پروژه جدید» دارای فیلدهای نام، شماره تماس، نوع کسب‌وکار، نوع سایت، توضیحات پروژه و اعتبارسنجی سمت کاربر باشد؛ برای GitHub Pages به backend وابسته نباشد و ساختارش برای اتصال آتی API/WordPress روشن باشد.
- [x] شماره `09211237543` و social links فقط Telegram، Instagram، Rubika، Bale با SVG و تنظیم آسان در یک config نمایش داده شوند؛ WhatsApp وجود نداشته باشد.
- [x] CTA پیش از footer: «آماده‌ای یک وب‌سایت متفاوت داشته باشی؟»، دکمه‌های «ثبت سفارش» و «تماس با من».
- [x] Footer با FastWeb96، متن «طراحی وب‌سایت‌های مدرن برای کسب‌وکارهای متفاوت.»، شماره، social links و «Designed by rezaakbari»؛ watermark ظریف.

## کیفیت فنی، ریسپانسیو، SEO و مستندات — تکمیل

- [x] Fade/reveal/slide/scale/floating/3D tilt/parallax/image zoom/glow/smooth scroll به‌اندازه و سبک پیاده شود؛ `prefers-reduced-motion` حرکت را کاهش دهد.
- [x] Performance: WebP، lazy loading، JavaScript حداقلی، بدون وابستگی سنگین یا ویدیو، و انیمیشن بهینه.
- [x] Desktop/Tablet طراحی 3D را حفظ کنند؛ Mobile طراحی اختصاصی، hamburger، کارت‌های تک‌ستونه، mockup کوچک، CTA قابل‌لمس، Portfolio یک یا دو ستون و بدون horizontal overflow داشته باشد.
- [x] SEO شامل title `FastWeb96 | طراحی وب‌سایت حرفه‌ای و مدرن`، meta description brief، OG، favicon، semantic HTML، سلسله‌مراتب صحیح H1/H2، alt، canonical و viewport باشد.
- [x] README فارسی توضیح دهد پروژه چیست، ساختار فایل‌ها، اجرای Local، GitHub upload و Pages activation، تعویض تصاویر/متون/شماره/social links، افزودن portfolio، تغییر `rezaakbari` و جایگزینی username/canonical.
- [x] CSS/JavaScript/HTML و لینک‌ها/asset paths ایستا بررسی شوند؛ Preview برای layout و رفتار منو، فیلتر، CTA و smooth scroll و breakpoint موبایل بررسی شود؛ کارایی فرم بدون backend روشن بماند.
