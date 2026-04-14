"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
class ProfessionalRequest {
    changePassword(req) {
        const confirmForgotPasswordTokenSchema = zod_1.default.object({
            email: zod_1.default.email("É necessário informar o endereço de e-mail"),
            password: zod_1.default
                .string("A senha precisa ser um texto")
                .min(8, "A senha precisa conter no mínimo 8 caracteres")
                .regex(/[A-Z]/, "A senha precisa conter pelo menos uma letra maiúscula")
                .regex(/[a-z]/, "A senha precisa conter pelo menos uma letra minúscula")
                .regex(/[0-9]/, "A senha precisa conter pelo menos um número")
                .regex(/[^A-Za-z0-9]/, "A senha precisa conter pelo menos um caractere especial"),
        });
        return confirmForgotPasswordTokenSchema.safeDecode(req.body);
    }
    ;
    confirmForgotPasswordToken(req) {
        const confirmForgotPasswordTokenSchema = zod_1.default.object({
            email: zod_1.default.email("É necessário informar o endereço de e-mail"),
            forgotPasswordToken: zod_1.default.string("É necessário enviar o código").length(5, 'É necessário enviar o código de 5 digitos enviado ao e-mail')
        });
        return confirmForgotPasswordTokenSchema.safeDecode(req.body);
    }
    ;
    sendForgotPasswordToken(req) {
        const sendForgotPasswordTokenSchema = zod_1.default.object({
            professionalEmail: zod_1.default.email("É necessário informar o endereço de e-mail"),
        });
        return sendForgotPasswordTokenSchema.safeDecode(req.body);
    }
    ;
    signup(req) {
        const signupSchema = zod_1.default.object({
            email: zod_1.default.email("É necessário informar o endereço de e-mail"),
            password: zod_1.default
                .string("A senha precisa ser um texto")
                .min(8, "A senha precisa conter no mínimo 8 caracteres")
                .regex(/[A-Z]/, "A senha precisa conter pelo menos uma letra maiúscula")
                .regex(/[a-z]/, "A senha precisa conter pelo menos uma letra minúscula")
                .regex(/[0-9]/, "A senha precisa conter pelo menos um número")
                .regex(/[^A-Za-z0-9]/, "A senha precisa conter pelo menos um caractere especial"),
            name: zod_1.default
                .string("É preciso informar o nome")
                .min(2, "O nome precisa ter no mínimo 2 caracteres")
        });
        return signupSchema.safeDecode(req.body);
    }
    ;
    confirmSignupToken(req) {
        const signupTokenConfirmationSchema = zod_1.default.object({
            professionalEmail: zod_1.default
                .email("É necessário enviar um e-mail para confirmação"),
            signupToken: zod_1.default
                .string("É preciso informar o token para continuar")
                .length(5, "O token precisa ter 5 caractéres")
        });
        return signupTokenConfirmationSchema.safeDecode(req.body);
    }
    ;
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
exports.default = new ProfessionalRequest();
