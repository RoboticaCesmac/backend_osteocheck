"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class GmailEmailService {
    constructor() {
        this.gmailUser = process.env.GMAIL_USER ?? 'emmanuelmedeiros05@gmail.com';
        this.gmailAppPassword = process.env.GMAIL_APP_PASSWORD ?? '123456';
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: this.gmailUser,
                pass: this.gmailAppPassword,
            },
        });
    }
    async sendEmail(emailPayload) {
        const emailAddresses = emailPayload.emailAddress.join(', ');
        try {
            await this.transporter.sendMail({
                from: `"OsteoCheck" <${this.gmailUser}>`,
                to: emailAddresses,
                subject: emailPayload.subject,
                text: emailPayload.text,
            });
            console.log('Email sent successfully');
        }
        catch (err) {
            console.error(`Erro ao tentar enviar email: ${err.message}`);
            throw err;
        }
    }
}
exports.default = new GmailEmailService();
