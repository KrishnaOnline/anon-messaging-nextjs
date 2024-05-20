import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import nodemailer from "nodemailer";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string,
): Promise<ApiResponse> {
    try {
        // const res = await resend.emails.send({
        //     from: 'krishnavamshikusuma@gmail.com',
        //     to: email,
        //     subject: 'Anon Messaging | Verification Code',
        //     react: VerificationEmail({username, otp: verifyCode}),
        // });
        // console.log("Email Sent to ", res);
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "3ce494948b4ba6",
              pass: "3a89d960a55e6a"
            }
        });
        const info = await transporter.sendMail({
            from: '"Anon Messaging App" <abcd@mail.com>',
            to: email,
            subject: "Anon Messaging App Verification Email",
            text: "Hello world?",
            html: `<div>
                       <p>Username: ${username}</p>
                       <p>OTP: ${verifyCode}</p>
                   </div>`,
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