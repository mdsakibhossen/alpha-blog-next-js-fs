import { connectToDb } from "@/lib/connectToDb";
import { Category } from "@/models/category";
import { NextResponse } from "next/server";

// GET request to fetch all categories
export const GET = async (request) => {
    try {
        await connectToDb();
        const categories = await Category.find().sort({ createdAt: -1 });
        // console.log("Categories",categories);
        
        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        // console.error("Error fetching categories:", error);
        return NextResponse.json({ message: "Failed to fetch categories", error: error.message }, { status: 500 });
    }
};

export const POST = async (request) => {
    await connectToDb();
    const { title, slug, icon } = await request.json();

    if (!title || !slug || !icon) {
        return NextResponse.json({ message: "Missing required fields", ok: false }, { status: 400 });
    }

    try {
        const category = await Category.findOne({ slug });
        if (category) {
            return NextResponse.json({ message: "This Category is Already Created...", ok: false }, { status: 409 });

        }
        const newCategory = await new Category({ title, slug, icon })
        newCategory.save();
        return NextResponse.json({ category: newCategory, message: "Category is Created Successfully...", ok: true }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to Create...", error: error.message, ok: false },
            { status: 500 },
        );
    }
}