import { connectToDb } from "@/lib/connectToDb";
import { Post } from "@/models/post"; // Assuming your Post model is imported here
import { NextResponse } from "next/server";

// GET request to fetch a post by ID
export const GET = async (request, { params }) => {
    const { id } = params;

    try {
        await connectToDb();
        const post = await Post.findById(id).populate('category').populate('user'); // Populating category and user

        if (!post) {
            return NextResponse.json({ message: "Post not found", ok: false }, { status: 404 });
        }

        return NextResponse.json({ post, ok: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch post", error: error.message, ok: false }, { status: 500 });
    }
};

// PUT request to update a post by ID
export const PUT = async (request, { params }) => {
    const { id } = params;
    const postData = await request.json();

    try {
        await connectToDb();
        const updatedPost = await Post.findByIdAndUpdate(id, postData, {
            new: true, // Return the updated document
            runValidators: true, // Apply schema validation during update
        }).populate('category').populate('user'); // Populating category and user

        if (!updatedPost) {
            return NextResponse.json({ message: "Post not found", ok: false }, { status: 404 });
        }

        return NextResponse.json({ message: "Post updated successfully", post: updatedPost, ok: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to update post", error: error.message, ok: false }, { status: 500 });
    }
};

// DELETE request to delete a post by ID
export const DELETE = async (request, { params }) => {
    const { id } = params;

    try {
        await connectToDb();
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return NextResponse.json({ message: "Post not found", ok: false }, { status: 404 });
        }

        return NextResponse.json({ message: "Post deleted successfully", ok: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to delete post", error: error.message, ok: false }, { status: 500 });
    }
};
