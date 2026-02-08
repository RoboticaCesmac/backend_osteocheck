import { NextFunction, Request, Response } from "express";
import { JWTService } from "../commons/jwt/jwt";
import { HttpResponse } from "../utils/httpResponses";

export function authMiddleware() {
  const jwtService = new JWTService();
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const bearerToken = req.headers.authorization;
      const extractedToken = extractBearerToken(bearerToken);
      const professional = jwtService.verify(extractedToken);
      req.professional = {
        ...professional.data,
      }
      next();
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };
}

function extractBearerToken(token: string | undefined) {
  if (!token) {
    throw HttpResponse.unauthorized({
      message: "JWT Token must be present in this request",
    });
  }
  const splittedToken = token.split("Bearer ");
  if (!splittedToken[1]) {
    throw HttpResponse.badRequest({
      message: "Malformed bearer token",
    });
  }
  return splittedToken[1];
}
