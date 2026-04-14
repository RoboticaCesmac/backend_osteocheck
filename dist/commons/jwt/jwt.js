"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const jwtExpirationTime = process.env.JWT_EXPIRATION_TIME;
class JWTService {
    constructor() {
        this.sign = (data) => {
            if (typeof jwtSecret !== "string") {
                throw new Error("Could not identify JWT secret");
            }
            if (!jwtExpirationTime) {
                throw new Error("Could not identify expiration time for JWT Token");
            }
            const jwtCode = jsonwebtoken_1.default.sign({
                data,
            }, jwtSecret, {
                expiresIn: "365d",
            });
            return jwtCode;
        };
        this.verify = (token) => {
            if (typeof jwtSecret !== "string") {
                throw new Error("JWT Secret not found");
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
                return decoded;
            }
            catch (err) {
                throw err;
            }
        };
    }
}
exports.JWTService = JWTService;
