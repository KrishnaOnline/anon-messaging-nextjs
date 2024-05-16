import mongoose, {Schema, Document} from "mongoose";
import { Message, messageSchema } from "./message.model";

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMsgs: boolean;
    messages: Message[];
}
const userSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is Required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a Valid Email"],
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
    },
    verifyCode: {
        type: String,
        required: [true, "Verify Code is Required"]
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify Code Expity is Required"]
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMsgs: {
        type: Boolean,
        default: true,
    },
    messages: [messageSchema],
})

const UserModel = (mongoose.model.User as mongoose.Model<User>) 
                  || mongoose.model<User>("User", userSchema);