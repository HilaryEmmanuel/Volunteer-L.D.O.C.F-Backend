import Contact from "../models/contact.model"


class ContactService {
    public static async createMessage(name: string, email: string, message: string){
        try{
            const contact = await  Contact.create({ name: name, email: email, message: message})
            return contact
        }catch(err){
            throw err
        }
    }
}

export default ContactService