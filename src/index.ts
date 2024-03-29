import express, {Express, Request, Response} from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import  randomizeRoute  from './routes/randomize'
import  authRoute  from './routes/auth'
import { clientInfo } from './middlewares/middlewares'
import * as settings from "./settings"

dotenv.config()
const app: Express = express()

const PORT = process.env.PORT || 8000


app.use(express.json())
app.use(cookieParser(settings.COOKIE_SECRET))
app.use(cors())

app.use(clientInfo)



app.use('/api/randomize', randomizeRoute)
app.use('/api/auth', authRoute)

const mongoDBUrl =  process.env.DB_URL!


async function start() {
    try {
        await mongoose.connect(mongoDBUrl).then(()=>console.log('Mongoose подключен к базе данных.'))   
        app.listen(PORT, ()=>{console.log(`Server started on port: ${PORT}`)})

    } catch (error) {
        console.log(error);
    }
}


start()