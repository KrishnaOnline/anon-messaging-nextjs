"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

function SigninPage() {
    const {data: session} = useSession();
    if(session) {
        return (
            <div>
                Signed In as {session.user.email}
                <br/>
                <button onClick={() => signOut()}>
                    Sign Out
                </button>
            </div>
        )
    }
    return (
        <div>
            Not Signed In
            <br/>
            <button onClick={() => signIn()}>
                Sign In
            </button>
        </div>
    )
}

export default SigninPage;
