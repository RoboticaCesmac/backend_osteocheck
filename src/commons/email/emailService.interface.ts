export interface IEmailService {
  sendEmail: (emailAddress: string[], payload: any) => Promise<void>;
}