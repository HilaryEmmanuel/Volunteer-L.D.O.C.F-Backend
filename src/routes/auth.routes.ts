import express from 'express'
const router = express.Router()
import AuthController from '../controller/auth/auth.controller';
import VerifySignUp from '../middlewares/verifysignup';

router.post('/signup', VerifySignUp.verify , AuthController.signup)

router.post('/auth/login', AuthController.login)

router.post('/auth/logout', AuthController.logout)

router.post('/refresh-token', AuthController.refreshAndVerifyToken)

export default router
