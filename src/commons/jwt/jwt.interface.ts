import { JwtPayload } from "jsonwebtoken";

export interface IJwtService {
  sign: (data: any) => string;
  verify: (token: string) => JwtPayload;
}