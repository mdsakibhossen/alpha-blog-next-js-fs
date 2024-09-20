import { connectToDb } from "@/lib/connectToDb";
import { Post } from "@/models/post";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

// GET request to fetch all posts
export const GET = async (request) => {
    try {
        await connectToDb();
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const fetchAll = searchParams.get("fetchAll") === "true";
        const category = searchParams.get("category");
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = fetchAll ? 0 : parseInt(searchParams.get("limit")) || 2;
        const skip = (page - 1) * limit;

        let filter = {};
        if (category) {
            filter.category = category;
        }

        if (!session.user.isAdmin) {
            filter.user = session.user._id;
        }

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


export const POST = async (request) => {
    await connectToDb();

    try {
        const { title, slug, description, image, category, user, isFeatured } = await request.json();

        // Validate required fields
        if (!title || !slug || !description || !category || !user) {
            return NextResponse.json(
                { message: "Missing required fields", ok: false },
                { status: 400 }
            );
        }

        // Check if post with the same slug already exists
        const existingPost = await Post.findOne({ slug });
        if (existingPost) {
            return NextResponse.json(
                { message: "This post with the same slug already exists", ok: false },
                { status: 409 }
            );
        }

        // Create a new post object
        const newPost = new Post({
            title,
            slug,
            description,
            image: {
                secure_url: image.secure_url || "", // Ensure image object structure
                public_id: image.public_id || "",
            },
            category,
            user,
            isFeatured: isFeatured || false, // Optional isFeatured flag
        });

        // Save the new post to the database
        await newPost.save();

        return NextResponse.json(
            { post: newPost, message: "Post created successfully", ok: true },
            { status: 201 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: "Failed to create post", error: error.message, ok: false },
            { status: 500 }
        );
    }
};