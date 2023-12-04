import respond from '../../middlewares/respond'
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import node_forge from 'node-forge'
import dotenv from 'dotenv'
dotenv.config()

class PaymentController {
    static async makePayment(req, res) {
        try {
            const { name, amount, email, card_number, cvv, pin, expiry_month, expiry_year } = req.body
          
            //This fuction encrypts the payload 
            function encrypt(encryptionKey, payload) {
                const data = JSON.stringify(payload)
                const cipher = node_forge.cipher.createCipher('3DES-ECB', node_forge.util.createBuffer(encryptionKey))
                cipher.start({ iv: ''})
                cipher.update(node_forge.util.createBuffer(data, 'utf8'))
                cipher.finish()
                const encrypted = cipher.output
                return node_forge.util.encode64(encrypted.getBytes())
            }
            
            const payload = {
                "card_number": card_number,
                "cvv": cvv,
                "expiry_month": expiry_month,
                "expiry_year": expiry_year,
                "currency": "NGN",
                "amount": amount,
                "email": email,
                "fullname": name,
                "tx_ref": uuid(),
                "redirect_url": "https://example_company.com/success",
                "enckey": process.env.FLW_ENCRYPTION_KEY,
                "authorization":{
                    "mode":"pin",
                    "pin": pin
                }
            }
            
            const encryptData = encrypt(process.env.FLW_ENCRYPTION_KEY, payload)

            const response = await axios('https://api.flutterwave.com/v3/charges?type=card', {
                headers: {
                    Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
                },
                method: 'post',
                data: {
                    "client": encryptData
                }
            })
            if (!response) {
                return respond(res, 400, 'Flutterwave redirect not successfull')
            }
            return respond(res, 200, 'Flutterwave redirect successfull', response.data)
        } catch (err) {
            console.error(err)
            return respond(res, 500, 'Error processing payments')
        }
    }
}


export default PaymentController