import { IEmailService } from "./emailService.interface";
import { EmailPayload } from "./type/emailPayload.type";
declare class GmailEmailService implements IEmailService {
    private gmailUser;
    private gmailAppPassword;
    private transporter;
    constructor();
    sendEmail(emailPayload: EmailPayload): Promise<void>;
}
declare const _default: GmailEmailService;
export default _default;
