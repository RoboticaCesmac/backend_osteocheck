import { EmailType } from "../enum/emailType.enum";

export type EmailPayload = {
  emailAddress: string[];
  text: string;
  subject: string;
}
