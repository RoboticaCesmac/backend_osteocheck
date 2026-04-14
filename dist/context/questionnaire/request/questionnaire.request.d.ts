import zod from 'zod';
import { Request } from "express";
import { QuestionnaireType } from '../enum/questionnaireType.enum';
declare class QuestionnaireRequest {
    getQuestionnaireProgress(req: Request): zod.ZodSafeParseResult<{
        patientId: number;
        questionnaireType: QuestionnaireType.JawAssessment;
    }>;
    generatePdf(req: Request): zod.ZodSafeParseResult<{
        id: number;
    }>;
}
declare const _default: QuestionnaireRequest;
export default _default;
