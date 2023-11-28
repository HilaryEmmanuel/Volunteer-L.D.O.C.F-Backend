import express from 'express'
import { Request, Response } from 'express'
import respond from './middlewares/respond'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const options = {
    origin: '*',
    methods: ['POST', 'PATCH','PUT', 'GET', 'DELETE'],
    allowheader: ['Content-Type', 'Authorization']
  }
app.use(cors(options))
app.use(cookieParser())
app.use(helmet())

app.use(cors())

app.get('/', (req: Request, res: Response)=>{
    respond(res, 200, 'Express API is running...')
    
})

app.get('*', (req: Request, res: Response)=>{
    respond(res, 400, 'Endpoint does not exist')
})

export default app