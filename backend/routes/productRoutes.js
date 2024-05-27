import express from 'express'
const router = express.Router()

import {
    getSeedProducts,
    getSeedProductById,
    deleteSeedProduct,
    createSeedProduct,
    updateSeedProduct,
    createSeedProductReview
} from './../controllers/productSeedController.js'
import {
    getLendMachnines,
    getLendMachnineById,
    deleteLendMachnine,
    updateLendMachine,
    createLendMachine,
    createMachineProductReview,
    updateMachineQuantity
} from './../controllers/productLendMachineController.js'
import {
    getConsumerProducts,
    getConsumerProductById,
    deleteConsumerProduct,
    createConsumer,
    updateConsumer
} from './../controllers/consumerProductControlller.js'
import { protect, admin } from './../middleware/authMiddleware.js'


router
    .route('/seeds')
    .get(getSeedProducts)
    .post(protect,createSeedProduct)

router
    .route('/seeds/:id/reviews')
    .post(protect, createSeedProductReview)

router
    .route('/seeds/:id/')
    .put(protect,updateSeedProduct)

router
    .route('/seeds/:id')
    .get(getSeedProductById)
    .delete(protect, admin, deleteSeedProduct)

router
    .route('/lendMachines')
    .get(getLendMachnines)
    .post(protect, createLendMachine)

router
    .route('/lendMachines/:id')
    .get(getLendMachnineById)
    .delete(protect, deleteLendMachnine)
    .put(protect, updateLendMachine)

router
    .route('/lendMachines/:id/reviews')
    .post(protect, createMachineProductReview)

router
    .route('/consumer')
    .get(getConsumerProducts)
    .post(protect, createConsumer)

router
    .route('/consumer/:id')
    .get(getConsumerProductById)
    .delete(protect, deleteConsumerProduct)
    .put(protect, updateConsumer)


// Add a new route for updating machine quantity
router
    .route('/lendMachines/:id/quantity')
    .put(protect, updateMachineQuantity)


export default router
