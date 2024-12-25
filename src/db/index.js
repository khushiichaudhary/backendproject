import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

//async await and try catch block 2 chij chahiye
const connectDB= async ()=>{
    try{
           const connectionInstance= await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)

           console.log(`\n MONGODB CONNECTED !! DB HOST : ${connectionInstance.connection.host} \n`)
    }catch(error){
        console.log("MONGODB CONNECTION ERROR",error)
        process.exit(1) //exit with overload
    }
}

export default connectDB;