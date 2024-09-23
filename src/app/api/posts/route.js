import { connectToDb } from "@/lib/connectToDb";
import { Post } from "@/models/post";
import { NextResponse } from "next/server";
import { User } from "@/models/user";

// GET request to fetch posts by user or show all if admin
export const GET = async (request) => {
    try {
        await connectToDb();
        const { searchParams } = new URL(request.url);
        const isFeatured = searchParams.get("isFeatured") === "true"; 
        const category = searchParams.get("category"); // ID
        const user = searchParams.get("user"); // ID
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 0; // No limit by default
        const skip = (page - 1) * limit;

        let filter = {};
        if (category) {
            filter.category = category;
        }
        if (isFeatured) {
            filter.isFeatured = isFeatured;
        }

        if (user) {
            const dbUser = await User.findById(user); // Fetch user by ID
            if (!dbUser.isAdmin) {
                filter.user = dbUser._id; // Apply user filter if valid
            }
        }

        // Fetch posts with filtering, pagination, and sorting
        const posts = await Post.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalPosts = await Post.countDocuments(filter);
        const totalPages = limit > 0 ? Math.ceil(totalPosts / limit) : 1;

        return NextResponse.json(
            {
                posts,
                totalPages,
                currentPage: page,
                totalPosts,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch posts", error: error.message },
            { status: 500 }
        );
    }
};
