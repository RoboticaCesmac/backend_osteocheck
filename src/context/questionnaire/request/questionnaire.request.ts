import zod from 'zod';
import { Request } from "express";
import { QuestionnaireType } from '../enum/questionnaireType.enum';

class QuestionnaireRequest {
    getQuestionnaireProgress(req: Request) {
        const querySchema = zod.object({
            patientId: zod.coerce.number({
                error: "É preciso informar o patientId",
            }),
            questionnaireType: zod.enum(QuestionnaireType, {
                error: "É preciso informar o questionnaireType",
            }),
        });

        return querySchema.safeParse(req.query);
    }
}

export default new QuestionnaireRequest();
