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
            // if (!dbUser.isAdmin) {
            //     filter.user = dbUser._id; // Apply user filter if valid
            // }
            if (dbUser) {
                filter.user = dbUser._id; // Filter by the selected user's ID
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
