import express, {Express, Request, Response} from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import  randomizeRoute  from './routes/randomize'

dotenv.config()
const app: Express = express()

const PORT = process.env.PORT || 8000


app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api/randomize', randomizeRoute)



const mongoDBUrl =  process.env.DB_URL

async function start() {
    try {
        await mongoose.connect(mongoDBUrl).then(()=>console.log('Mongoose подключен к базе данных.'))
        app.listen(PORT, ()=>{console.log(`Server started on port: ${PORT}`)})
    } catch (error) {
        console.log(error);
    }
}


start()