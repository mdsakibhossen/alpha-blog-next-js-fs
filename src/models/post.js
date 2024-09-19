import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minLength: 1,
            maxLength: 250,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minLength: 1,
            maxLength: 300,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            secure_url: {
                type: String,
                default: "",
            },
            public_id: {
                type: String,
                default: "",
            },
        },
        category: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Category",  
            required: true, 
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isFeatured: {
            type: Boolean,
            default: false
        }
        
    },
    { timestamps: true },
);


export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);
