import { IEmailService } from "./emailService.interface";

export class EmailService implements IEmailService {
  sendEmail = async (emailAddress: string[], payload: any): Promise<void> => {
    console.log('sending e-mail');
    return
  }
}