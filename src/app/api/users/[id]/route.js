
import { connectToDb } from "@/lib/connectToDb";
import { User } from "@/models/user";
import { NextResponse } from "next/server";


// GET request to fetch a user by ID
export const GET = async (request, { params }) => {
    const { id } = params;

    try {
        await connectToDb();
        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        // console.error("Error fetching user:", error);
        return NextResponse.json({ message: "Failed to fetch user", error: error.message, ok: false }, { status: 500 });
    }
};


// PUT request to update a user by ID
export const PUT = async (request, { params }) => {
    const { id } = params;
    const userData = await request.json();
    // console.log(id,"ID");


    try {
        await connectToDb();
        const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true, runValidators: true });

        if (!updatedUser) {
            return NextResponse.json({ message: "User not found", ok: false }, { status: 404 });
        }

        return NextResponse.json({ message: "Successfully Updated", user: updatedUser, ok: true }, { status: 200 });
    } catch (error) {
        // console.error("Error updating user:", error);
        return NextResponse.json({ message: "Failed to update user", error: error.message, ok: false }, { status: 500 });
    }
};


// DELETE request to delete a User by ID
export const DELETE = async (request, { params }) => {
    const { id } = params;

    try {
        await connectToDb();
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Successfully Deleted" }, { status: 200 });
    } catch (error) {
        // console.error("Error deleting User:", error);
        return NextResponse.json({ message: "Failed to delete User", error: error.message }, { status: 500 });
    }
};