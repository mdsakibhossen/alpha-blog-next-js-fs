import { connectToDb } from "@/lib/connectToDb";
import { Post } from "@/models/post";
import { NextResponse } from "next/server";

// GET request to fetch all posts
export const GET = async (request) => {
    try {
        await connectToDb();

        // Get query parameters for category, page, and limit
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category"); // Get category from query
        const user = searchParams.get("user"); // Get user from query
        const page = parseInt(searchParams.get("page")) || 1; // Default to page 1
        const limit = parseInt(searchParams.get("limit")) || 2; // Default limit of 2 posts per page

        // Calculate skip value for pagination
        const skip = (page - 1) * limit;

        // Create a filter object for category if it's provided
        let filter = {};
        if (category) {
            filter.category = category;
        }
        if (user) {
            filter.user = user;
        }

        // Fetch posts with pagination and filtering by category
        const posts = await Post.find(filter)
            .sort({ createdAt: -1 })  // Sort by createdAt in descending order
            .skip(skip)
            .limit(limit);

        // Get total number of posts for pagination info, with the same filter
        const totalPosts = await Post.countDocuments(filter);
        const totalPages = Math.ceil(totalPosts / limit);

        // Return the posts along with pagination details
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