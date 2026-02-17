import { ServiceResponse } from "../../../utils/serviceResponse";
import { NextQuestionDTO } from "../dto/nextQuestion.dto";
import { Question } from "../entity/question.entity";

export interface IQuestionnaireService {
  nextQuestion: (nextQuestionDTO: NextQuestionDTO) => Promise<ServiceResponse<Question | null>>
}