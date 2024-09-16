import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minLength: 1,
            maxLength: 200,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minLength: 1,
            maxLength: 200,
        },
        icon: {
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
    { timestamps: true },
);


export const Category =  mongoose.models?.Category || mongoose.model("Category", categorySchema);
