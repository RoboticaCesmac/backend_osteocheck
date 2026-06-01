import { IEmailService } from "./emailService.interface";
import { EmailPayload } from "./type/emailPayload.type";
import { Resend } from "resend";

class GmailEmailService implements IEmailService {
    private gmailUser: string;
    private gmailAppPassword: string;
    private resend: Resend;

    constructor() {
        this.gmailUser = process.env.GMAIL_USER ?? 'no-reply@citeccesmac.com.br';
        this.gmailAppPassword = process.env.GMAIL_APP_PASSWORD ?? '';

        this.resend = new Resend(this.gmailAppPassword);
    }

    async sendEmail(emailPayload: EmailPayload): Promise<void> {
        const emailAddresses = emailPayload.emailAddress.join(', ');

        try {
            await this.resend.emails.send({
                from: `OsteoCheck <${this.gmailUser}>`,
                to: emailAddresses,
                subject: emailPayload.subject,
                text: emailPayload.text,
            });

            console.log('Email sent successfully');
        } catch (err: any) {
            console.error(`Erro ao tentar enviar email: ${err.message}`);
            throw err;
        }
    }
}

export default new GmailEmailService();