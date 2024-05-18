import express from 'express'
const router = express.Router()

import { 
    addOrderItems, 
    getOrderById, 
    updateOrderToPaid,
    updateOrderToPaidCOD,
    getMyOrders, 
    getOrders,
    updateOrderToDelivered,
    updateOrderToReturned
} from '../controllers/orderController.js'
import { protect, admin } from './../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/paycod').put(protect, updateOrderToPaidCOD)
router.route('/:id/deliver').put(protect, updateOrderToDelivered)
router.route('/:id/return').put(protect, admin, updateOrderToReturned)

export default router