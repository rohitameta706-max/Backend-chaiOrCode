import mongoose,{Schema} from "mongoose";
import { JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcrypt";

const userScehema = new Schema(
    {
        username :{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
        email :{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
        fullname :{
        type: String,
        required: true,
        trim: true,
        index:true
    },
        avatar :{
        type: String, //cloudinary url
        required: true,
    },
        coverImage: {
            type: String,//cloudinary url

    },
        watchHistory:[
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
    ],
        password:{
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
    },
},
    { 
        timestamps: true
    },
)

userScehema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
} )

userScehema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userScehema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userScehema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}


export const User = mongoose.model("User", userScehema)