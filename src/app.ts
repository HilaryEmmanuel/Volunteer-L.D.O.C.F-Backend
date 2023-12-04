import express from 'express'
import { Request, Response } from 'express'
import respond from './middlewares/respond'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import authRouter from './routes/auth.routes'
import paymentRouter from './routes/payment.routes'
import userRouter from './routes/user.routes'

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const options = {
    origin: '*',
    methods: ['POST', 'PATCH', 'PUT', 'GET', 'DELETE'],
    allowheader: ['Content-Type', 'Authorization']
}

const limiter = rateLimit({
    windowMs: 60 * 1000, //1 minutes
    limit: 5, //5 request per window
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: 'Too many request, please try again later.'
})

app.use(limiter)
app.use(cors(options))
app.use(cookieParser())
app.use(helmet())

app.use(cors())

app.get('/', (req: Request, res: Response) => {
    respond(res, 200, 'Express API is running...')

})

app.use('/api', authRouter, paymentRouter, userRouter)

app.get('*', (req: Request, res: Response) => {
    respond(res, 400, 'Endpoint does not exist')
})

export default app