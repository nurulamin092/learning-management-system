import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    firstName: {
        require: true,
        type: String
    },
    lastName: {
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String
    },
    email: {
        require: true,
        type: String
    },
    phone: {
        require: true,
        type: String
    },
    role: {
        require: true,
        type: String
    },
    bio: {
        require: false,
        type: String
    },
    socialMedia: {
        require: false,
        type: Object
    },
    profilePicture: {
        require: false,
        type: String
    }

})


export const User = mongoose.models.User ?? mongoose.model("User", userSchema)