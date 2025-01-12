import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"


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

const {fullName, email,username,password}=req.body
console.log("email:",email);

if([fullName,email,username,password].some((field)=>field?.trim()==="")){
    throw new ApiError(400,"All fields are required")
}
const existedUser=User.findOne({
    $or :[{email},{username}]
})

if(existedUser){
    throw new ApiError(409,"User already exists")
}

const avatarLocalPath=req.files?.avatar[0]?.path;

const coverImageLocalPath= req.files?.coverImage[0]?.path;

if(!avatarLocalPath ){
    throw new ApiError(400,"Avatar image are required")}

const avatar =await  uploadOnCloudinary(avatarLocalPath)

const coverImage =await  uploadOnCloudinary(coverImageLocalPath)

if(!avatar){
    throw new ApiError(500,"Error uploading avatar image")}

  const user=await  User.create({
        fullName,
        avatar: avatsr.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username: toLowerCase(),
    })

   const createdUser= await User.findById(user._id).select(
    "-password -refreshToken"
   )
   if(!createdUser){
       throw new ApiError(500,"something went wrong while registering user")
   }

   return res.status(201).json(
    new ApiResponse(200,"craeted user successfully",createdUser)
   )


})

export {registerUser}