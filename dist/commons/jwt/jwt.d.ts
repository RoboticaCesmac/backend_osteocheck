import { IJwtService } from "./jwt.interface";
import { JwtPayload } from "jsonwebtoken";
export declare class JWTService implements IJwtService {
    sign: (data: any) => string;
    verify: (token: string) => JwtPayload;
}
