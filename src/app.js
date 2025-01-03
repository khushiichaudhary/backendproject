import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended: true, limit: '16kb'}))
app.use(express.static("public"))
app.use(cookieParser)
//q ki cofigaration hai
//multter used for file handling



//routes

import userRouter from './routes/user.routes.js'

//router decleration 
//app.get karte te jab hum direct sab kuch ek hi file me hota tha routes and all, but yaha humne seprate kar diya hai so we will use this syntex or ye complasry hai
app.use("/api/v1/users",userRouter)

// https://localhost:8000/api/v1/users/register

export {app}