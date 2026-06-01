"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const patientsGender_enum_1 = require("../enum/patientsGender.enum");
class ProfessionalRequest {
    create(req) {
        const signupSchema = zod_1.default.object({
            dateOfBirth: zod_1.default
                .coerce.date(),
            gender: zod_1.default
                .enum(patientsGender_enum_1.PatientsGender),
            name: zod_1.default
                .string("É preciso informar o nome")
                .min(2, "O nome precisa ter no mínimo 2 caracteres")
        });
        return signupSchema.safeDecode(req.body);
    }
    ;
}
exports.default = new ProfessionalRequest();
