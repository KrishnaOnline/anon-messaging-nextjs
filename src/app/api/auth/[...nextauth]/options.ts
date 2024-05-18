import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";   // if any 3rd party providers, enter that instead of credentials...
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},
            },
            authorize: async (credentials: any): Promise<any> => {
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            {email: credentials.identifier},
                            {username: credentials.identifier},
                        ]
                    })
                    if(!user) {
                        throw new Error("No User found with this Email");
                    }
                    if(!user.isVerified) {
                        throw new Error("Please Verify your Email");
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                    if(!isPasswordCorrect) {
                        throw new Error("Incorrect Password");
                    }
                    return user;
                } catch(err: any) {
                    throw new Error(err);
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if(user) {
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMsgs = user.isAcceptingMsgs;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            if(token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMsgs = token.isAcceptingMsgs;
                session.user.username = token.username;
            }
            return session;
        }
    },
    pages: {
        signIn: "/sign-in",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}