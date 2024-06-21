import express from 'express'
import { addProduct, allProduct, deleteProduct, singleProduct, updateProduct } from '../controllers/productControllers.js'

const router = express.Router()

router.post('/product',addProduct)
router.delete("/product/delete/:id",deleteProduct)
router.get('/product/find',allProduct )
router.get('/product/:id',singleProduct )
router.put('/product/update/:id',updateProduct )

export default router