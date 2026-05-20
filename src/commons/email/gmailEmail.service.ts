import { IEmailService } from "./emailService.interface";
import { EmailPayload } from "./type/emailPayload.type";
import nodemailer from 'nodemailer';


class GmailEmailService implements IEmailService {
    private gmailUser: string;
    private gmailAppPassword: string;
    private transporter: nodemailer.Transporter;

    constructor() {
        this.gmailUser = process.env.GMAIL_USER ?? 'emmanuelmedeiros05@gmail.com';
        this.gmailAppPassword = process.env.GMAIL_APP_PASSWORD ?? '123456';
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.gmailUser,
                pass: this.gmailAppPassword,
            },
        });
    }

    async sendEmail(emailPayload: EmailPayload): Promise<void> {
        const emailAddresses = emailPayload.emailAddress.join(', ');
        try {
            await this.transporter.sendMail({
                from: `"OsteoCheck" <${this.gmailUser}>`,
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