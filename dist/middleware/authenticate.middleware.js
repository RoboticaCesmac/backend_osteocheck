"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jwt_1 = require("../commons/jwt/jwt");
const httpResponses_1 = require("../utils/httpResponses");
function authMiddleware() {
    const jwtService = new jwt_1.JWTService();
    return (req, res, next) => {
        try {
            console.log(req.headers.authorization);
            const bearerToken = req.headers.authorization;
            const extractedToken = extractBearerToken(bearerToken);
            const professional = jwtService.verify(extractedToken);
            req.professional = {
                ...professional.data,
            };
            next();
        }
        catch (err) {
            return res.status(err.statusCode || 500).send({ error: err.message });
        }
    };
}
function extractBearerToken(token) {
    if (!token) {
        throw httpResponses_1.HttpResponse.unauthorized({
            message: "JWT Token não fornecido!",
        });
    }
    const splittedToken = token.split("Bearer ");
    if (!splittedToken[1]) {
        throw httpResponses_1.HttpResponse.badRequest({
            message: "Token malformado!",
        });
    }
    return splittedToken[1];
}
