import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minLength: 1,
            maxLength: 50,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            index: true,
            lowercase: true,
            unique: true,
            trim: true,
            minLength: 5,
            maxLength: 100,
        },
        password: String,
        isAdmin: {
            type: Boolean,
            default: false
        },
        profilePic: {
            secure_url: {
                type: String,
                default: "",
            },
            public_id: {
                type: String,
                default: "",
            },
        },
    },
    { timestamps: true }
);


export const User = mongoose.models.User || mongoose.model("User", userSchema);