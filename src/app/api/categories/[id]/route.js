
import { connectToDb } from "@/lib/connectToDb";
import { Category } from "@/models/category";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


// GET request to fetch a category by ID
export const GET = async (request, { params }) => {
    const { id } = params;

    try {
        await connectToDb();
        // const category = await Category.findById(id);
        // console.log(id,"ID");

        let category;
        // Check if the id is a valid ObjectId
        if (mongoose.Types.ObjectId.isValid(id)) {
            category = await Category.findOne({ _id: id });
        } else {
            category = await Category.findOne({ slug: id });
        }
        // console.log(category,"Cat");
        
        if (!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }

        return NextResponse.json({ category, ok: true }, { status: 200 });
    } catch (error) {
        // console.error("Error fetching category:", error);
        return NextResponse.json({ message: "Failed to fetch category", error: error.message, ok: false }, { status: 500 });
    }
};


// PUT request to update a category by ID
export const PUT = async (request, { params }) => {
    const { id } = params;
    const categoryData = await request.json();
    // console.log(id,"ID");


    try {
        await connectToDb();
        const updatedCategory = await Category.findByIdAndUpdate(id, categoryData, { new: true, runValidators: true });

        if (!updatedCategory) {
            return NextResponse.json({ message: "Category not found", ok: false }, { status: 404 });
        }

        return NextResponse.json({ message: "Successfully Updated", category: updatedCategory, ok: true }, { status: 200 });
    } catch (error) {
        // console.error("Error updating category:", error);
        return NextResponse.json({ message: "Failed to update category", error: error.message, ok: false }, { status: 500 });
    }
};


// DELETE request to delete a Category by ID
export const DELETE = async (request, { params }) => {
    const { id } = params;

    try {
        await connectToDb();
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Successfully Deleted" }, { status: 200 });
    } catch (error) {
        // console.error("Error deleting Category:", error);
        return NextResponse.json({ message: "Failed to delete Category", error: error.message }, { status: 500 });
    }
};