"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
class AdminRequest {
    login(req) {
        const loginSchema = zod_1.default.object({
            email: zod_1.default.email("É necessário informar o endereço de e-mail"),
            password: zod_1.default
                .string("A senha precisa ser um texto")
                .min(5, "A senha precisa conter no mínimo 5 caracteres"),
        });
        return loginSchema.safeParse(req.body);
    }
}
exports.default = new AdminRequest();
