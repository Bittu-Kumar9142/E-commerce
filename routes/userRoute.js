import express from 'express'
import { longin, user_sinup } from '../controllers/userControllers.js'

const router = express.Router()

router.post('/user/sing-up', user_sinup)
router.post('/user/longin', longin)

export default router