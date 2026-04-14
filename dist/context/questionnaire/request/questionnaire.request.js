"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const questionnaireType_enum_1 = require("../enum/questionnaireType.enum");
class QuestionnaireRequest {
    getQuestionnaireProgress(req) {
        const querySchema = zod_1.default.object({
            patientId: zod_1.default.coerce.number({
                error: "É preciso informar o patientId",
            }),
            questionnaireType: zod_1.default.enum(questionnaireType_enum_1.QuestionnaireType, {
                error: "É preciso informar o questionnaireType",
            }),
        });
        return querySchema.safeParse(req.query);
    }
    generatePdf(req) {
        const paramSchema = zod_1.default.object({
            id: zod_1.default.coerce.number({
                error: "É preciso informar o id da resposta do questionário",
            }),
        });
        return paramSchema.safeParse(req.params);
    }
}
exports.default = new QuestionnaireRequest();
