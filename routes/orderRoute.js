import express from 'express'

import { auth } from '../middlewares/authMiddlewares.js'
import { addOrder, deleteOrder, orderList, singleOrder, totalCount, totalSales, updateStatus } from '../controllers/orderControllers.js'

const router = express.Router()

router.post('/order', addOrder)
router.delete("/order/delete/:id",deleteOrder)
router.get('/order/find',orderList )
router.get('/order/:id',singleOrder)
router.put('/order/update/:id',updateStatus)
router.get('/order/totalsales',totalSales)
router.get('/ordercount',totalCount)


export default router