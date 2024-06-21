import express from 'express'
import { addCatgory, allCategory, deleteCategory, singleCategory, updateCategory } from '../controllers/categorycontrollers.js'
import { auth } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.post('/category' , auth, addCatgory)
router.delete("/category/delete/:id",auth, deleteCategory)
router.get('/category/find',auth,allCategory )
router.get('/category/:id',auth, singleCategory)
router.put('/category/update/:id',auth, updateCategory)

export default router