import { connectToDb } from "@/lib/connectToDb";
import { Category } from "@/models/category";
import { NextResponse } from "next/server";

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