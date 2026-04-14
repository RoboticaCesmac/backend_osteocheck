"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const resend_1 = require("resend");

class GmailEmailService {
    constructor() {
        this.gmailUser = process.env.GMAIL_USER;
        this.gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

        this.transporter = new resend_1.Resend(this.gmailAppPassword);
    }

    async sendEmail(emailPayload) {
        const emailAddresses = emailPayload.emailAddress; // não precisa join

        try {
            await this.transporter.emails.send({
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