import zod from 'zod';
import { Request } from "express";
import { SignupDTO } from "../dto/signup.dto";
import { LoginDTO } from '../dto/login.dto';
import { ConfirmSignupTokenDTO } from '../dto/confirmSignupToken.dto';
import { ConfirmForgotPasswordTokenDTO } from '../dto/confirmForgotPasswordToken.dto';
import { ChangePasswordDTO } from '../dto/changePassword.dto';
declare class ProfessionalRequest {
    changePassword(req: Request): zod.ZodSafeParseResult<ChangePasswordDTO>;
    confirmForgotPasswordToken(req: Request): zod.ZodSafeParseResult<ConfirmForgotPasswordTokenDTO>;
    sendForgotPasswordToken(req: Request): zod.ZodSafeParseResult<{
        professionalEmail: string;
    }>;
    signup(req: Request): zod.ZodSafeParseResult<Omit<SignupDTO, "name">>;
    confirmSignupToken(req: Request): zod.ZodSafeParseResult<ConfirmSignupTokenDTO>;
    login(req: Request): zod.ZodSafeParseResult<LoginDTO>;
}
declare const _default: ProfessionalRequest;
export default _default;
