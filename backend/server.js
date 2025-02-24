import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRouts from './routs/productRouts.js';
import userRouts from './routs/userRouts.js';
import orderRouts from './routs/orederRouts.js';
import uploadeRouts from './routs/uploadRouts.js';

// بارگذاری تنظیمات محیطی
dotenv.config();

// اتصال به دیتابیس
connectDB();

const app = express();

// استفاده از middleware برای پارس کردن بدنه درخواست‌ها
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// مسیر اصلی API
app.get('/', (req, res) => {
    res.send('API is running...');
});

// مسیرهای محصولات و کاربران
app.use('/api/products', productRouts);
app.use('/api/users', userRouts);
app.use('/api/orders', orderRouts);
app.use('/api/upload', uploadeRouts);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    // any route that is not api will be redirected to index.html
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
 } else {
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
 }

// مدیریت خطاهای مربوط به مسیرها
app.use(notFound);
app.use(errorHandler);

// شروع به کار سرور
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));