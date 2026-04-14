import { EmailPayload } from "./type/emailPayload.type";
export interface IEmailService {
    sendEmail: (emailPayload: EmailPayload) => Promise<void>;
}
