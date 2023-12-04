import express from 'express'
const router = express.Router()
import ContactController from '../controller/user/contact.controller';

router.post('/contact-us', ContactController.contactUs)

export default router