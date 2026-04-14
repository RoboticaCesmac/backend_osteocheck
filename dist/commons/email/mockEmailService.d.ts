import { IEmailService } from "./emailService.interface";
import { EmailPayload } from "./type/emailPayload.type";
export declare class MockEmailService implements IEmailService {
    sendEmail: (emailPayload: EmailPayload) => Promise<void>;
}
