import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import UserModel from "@/models/User";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const {username, email, password} = await request.json();
        
    } catch(err) {
        console.error("Error Registering User", err);
        return Response.json({
            success: false,
            message: "Error Registering User",
        }, {status: 500})
    }
}