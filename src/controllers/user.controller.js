import {asyncHandler} from "../utils/asyncHandler.js"


const registerUser = asyncHandler(async (req,res)=>{
 //get user detail from frontend
//validation -not empty
//check if user already exists username, email
//check for image, avatar
//upload to cloudinary
//create user object - create entry in db
//remove password and refresh token from response
//check for user creation
//return response

const {fullName, email,username,password}=res.body
console.log("email:",email);



})


export {registerUser}