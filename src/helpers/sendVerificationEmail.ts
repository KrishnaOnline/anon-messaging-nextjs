import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string,
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Anon Messaging | Verification Code',
            react: VerificationEmail({username, otp: verifyCode}),
        });
        return {
            success: true,
            message: "Sent Verification Email Successfully",
        }
    } catch(err) {
        console.error("Error Sending Verification Email");
        return {
            success: false,
            message: "Failed to Send Verification Email",
        }
    }
}