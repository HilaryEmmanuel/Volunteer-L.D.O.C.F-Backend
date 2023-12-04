import express from 'express'
import AuthJwt from '../middlewares/authjwt'
import PaymentController from '../controller/payment/payment.controller'
import ValidateToken from '../middlewares/validatetoken'
const router = express.Router()


router.post('/payments', ValidateToken.checkBlaclistedTokens, AuthJwt.verifyJwt, PaymentController.makePayment)

router.get('/payments/list-payment', )

export default router