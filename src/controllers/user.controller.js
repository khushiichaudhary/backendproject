import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body;
    console.log("email:", email);

    // Validate required fields
    if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user already exists
    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    // Get avatar and cover image paths
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path || null;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar image is required");
    }

    // Upload images to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

    if (!avatar) {
        throw new ApiError(500, "Error uploading avatar image");
    }

    // Create user in database
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    });

    // Fetch created user without password and refreshToken
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

    // Return successful response
    return res.status(201).json(
        new ApiResponse(201, "Created user successfully", createdUser)
    );
});

export { registerUser };
