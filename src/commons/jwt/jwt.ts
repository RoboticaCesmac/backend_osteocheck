import { IJwtService } from "./jwt.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;
const jwtExpirationTime = process.env.JWT_EXPIRATION_TIME;

export class JWTService implements IJwtService {
  sign = (data: any): string => {
    if (typeof jwtSecret !== "string") {
      throw new Error("Could not identify JWT secret");
    }
    if (!jwtExpirationTime) {
      throw new Error("Could not identify expiration time for JWT Token");
    }

    const jwtCode = jwt.sign(
      {
        data,
      },
      jwtSecret,
      {
        expiresIn: "365d",
      }
    );
    return jwtCode;
  };

  verify = (token: string): JwtPayload => {
    if (typeof jwtSecret !== "string") {
      throw new Error("JWT Secret not found");
    }
    try {
      const decoded = jwt.verify(token, jwtSecret);
      return decoded as any;
    } catch (err) {
      throw err
    }
  };
}
