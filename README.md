# ProShop v2

یک فروشگاه سادهٔ نمونهٔ ساخته شده با Node.js (Express) برای backend و React برای frontend.

**ملاحظات سریع**
- زبان‌ها و فریم‌ورک‌ها: `Node.js`, `Express`, `MongoDB`, `React`, `Redux`/`RTK`.
- این مخزن شامل دو پوشهٔ اصلی است: `backend/` و `frontend/`.

## امکانات
- مدیریت محصولات
- سبد خرید و چک‌اوت
- احراز هویت کاربران
- مدیریت سفارشات برای ادمین

## پیش‌نیازها
- Node.js >= 14
- npm یا yarn
- MongoDB (محلی یا سرویس ابری)

## راه‌اندازی

1. کلون کردن مخزن

```bash
git clone <repo-url>
cd proshop-v2
```

2. پیکربندی متغیرهای محیطی

- فایل نمونه `example.env` در ریشه وجود دارد؛ آن را کپی کنید و مقادیر مناسب را در `.env` یا `backend/.env` قرار دهید.

متغیرهای معمول:
- `MONGO_URI` — آدرس اتصال به MongoDB
- `JWT_SECRET` — کلید JWT
- `PORT` — پورت سرور backend

3. نصب و اجرای Backend

```bash
cd backend
npm install
# برای ساخت دادهٔ اولیه (اختیاری)
node seeder.js
npm run dev
```

سرور backend معمولاً روی `http://localhost:5000` اجرا می‌شود.

4. نصب و اجرای Frontend (در حالت توسعه)

```bash
cd frontend
npm install
npm start
```

React dev server معمولاً روی `http://localhost:3000` اجرا می‌شود و به backend اشاره می‌کند.

## ساخت Production

- برای ساخت frontend:

```bash
cd frontend
npm run build
```

- فایل‌های ساخته‌شده در `frontend/build` قرار می‌گیرند و می‌توان آن‌ها را با backend سرو کرد یا روی هر سرویس میزبان استاتیک آپلود کرد.

## دادهٔ نمونه
- اسکریپت `backend/seeder.js` داده‌های اولیه را وارد MongoDB می‌کند. قبل از اجرای آن، مطمئن شوید `MONGO_URI` تنظیم شده است.

## ساختار پروژه (خلاصه)
- `backend/` — سرور Express، مدل‌ها، روت‌ها، کنترلرها
- `frontend/` — اپ React، صفحات، کامپوننت‌ها

## تست و توسعه
- تست خاصی اضافه نشده؛ می‌توانید تست‌های موردنظر خود را اضافه کنید.

## مشارکت
- هر گونه درخواست Pull Request خوش‌آمد است. لطفاً قبل از پیوستِ تغییرات، یک Issue باز کنید تا بحث کنیم.

## لایسنس
- این پروژه به صورت پیش‌فرض بدون لایسنس مشخص است. اگر می‌خواهید، یک فایل `LICENSE` اضافه کنید (مثلاً MIT).

---

اگر می‌خواهید من راه‌اندازی CI/CD، فایل `LICENSE` یا توضیحات بیشتری (مثلاً API docs) اضافه کنم، بگویید تا انجام دهم.
