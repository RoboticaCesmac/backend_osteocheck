import { ServiceResponse } from "../../../utils/serviceResponse";
import { GeneratePdfDTO } from "../dto/generatePdf.dto";
import { NextQuestionDTO } from "../dto/nextQuestion.dto";
import { QuestionnaireProgressDTO, QuestionnaireProgressResponse } from "../dto/questionnaireProgress.dto";
import { Question } from "../entity/question.entity";
export interface IQuestionnaireService {
    nextQuestion: (nextQuestionDTO: NextQuestionDTO) => Promise<ServiceResponse<Question | null>>;
    getQuestionnaireProgress: (questionnaireProgressDTO: QuestionnaireProgressDTO) => Promise<ServiceResponse<QuestionnaireProgressResponse>>;
    generatePdf: (generatePdfDTO: GeneratePdfDTO) => Promise<ServiceResponse<Buffer>>;
}
