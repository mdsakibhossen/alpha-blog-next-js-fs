import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (request) => {
    const { image } = await request.json();
    try {
        const { public_id, secure_url } = await cloudinary.uploader.upload(image);
        return NextResponse.json({ public_id, secure_url }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to Upload Image...", error: error.message, ok: false },
            { status: 500 }
        )
    }
}

export const DELETE = async (request) => {
    const { public_id } = await request.json();

    try {
        await cloudinary.uploader.destroy(public_id);
        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to Delete Image...", error: error.message, ok: false },
            { status: 500 }
        )
    }
}