import express from 'express';
const router = express.Router();
import {
   registerUser,
   logoutUser,
   authUser,
   getUserProfile,
   updateUserProfile,
   getUsers,
   getUsersByID,
   deleteUser,
   updateUser
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, admin, getUsers); // ثبت‌نام کاربر و دریافت همه کاربران
router.post('/logout', logoutUser); // خروج از حساب
router.post('/auth', authUser); // ورود کاربر
router.route('/profile')
   .get(protect, getUserProfile) // دریافت پروفایل کاربر
   .put(protect, updateUserProfile); // بروزرسانی پروفایل کاربر
router.route('/:id')
   .get(protect, admin, getUsersByID) // دریافت کاربر با ID
   .put(protect, admin, updateUser) // بروزرسانی کاربر
   .delete(protect, admin, deleteUser); // حذف کاربر

export default router;
