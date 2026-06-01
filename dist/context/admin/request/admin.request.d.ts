import zod from 'zod';
import { Request } from "express";
import { LoginDTO } from '../dto/login.dto';
declare class AdminRequest {
    login(req: Request): zod.ZodSafeParseResult<LoginDTO>;
}
declare const _default: AdminRequest;
export default _default;
