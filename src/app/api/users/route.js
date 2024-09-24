import { connectToDb } from "@/lib/connectToDb";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (request) => {

    try {
        await connectToDb();
        const users = await User.find().sort({ createdAt: -1 });
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        // console.log("Error:",error);
        return NextResponse.json({ message: "", error: error.message, ok: false }, { status: 500 });
    }
}