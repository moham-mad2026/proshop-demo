import express from 'express';
const router = express.Router();
import {
    addOrderItems, getmyOrders, getOrderByID, updateOrderToPaid, updateOrderToDelivered, getOrders 
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect ,addOrderItems).get(protect, admin, getOrders); // ثبت‌نام کاربر و دریافت همه کاربران
router.route('/mine').get(protect, getmyOrders);
router.route('/:id').get(protect, getOrderByID);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);


export default router;
