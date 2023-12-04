import { Request, Response } from 'express'
import respond from '../../middlewares/respond'
import ContactService from '../../services/contact.service'


class ContactController {
    public static async contactUs(req: Request, res: Response) {
        try {
            const { name, email, message } = req.body
            const contact = await ContactService.createMessage(name, email, message)
            if (!contact) {
                return respond(res, 400, 'contact request unsuccessfull')
            }
            return respond(res, 200, 'contact request sent successfully', { contact })
        } catch (err) {
            console.log(err)
            return respond(res, 500, 'Internal server error')

        }
    }
}

export default ContactController