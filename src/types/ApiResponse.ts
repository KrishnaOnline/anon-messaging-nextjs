import { Message } from "@/models/Message";

export interface ApiResponse {
    success: boolean,
    message: string,
    isAcceptingMsgs?: boolean,
    messages?: Array<Message>
}