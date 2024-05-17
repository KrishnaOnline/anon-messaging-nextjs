import {z} from "zod";

export const signupSchema = z.object({
    username: z.string()
               .min(2, "Username must be atleast two chars")
               .max(20, "Username must be less than 20 chars")
               .regex(/^[a-zA-Z0-9_]+$/, "Username must not have special chars other than _"),
    email: z.string()
            .email({message: "Invalid Email"}),
    password: z.string()
               .min(6, {message: "Password must be atleast 6 chars"}),
})