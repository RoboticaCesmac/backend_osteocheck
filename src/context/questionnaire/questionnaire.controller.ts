import { Request, Response } from "express";
import { IQuestionnaireService } from "./interface/questionnaireService.interface";

export class QuestionnaireController {
  private questionnaireService: IQuestionnaireService;

  constructor(questionnaireService: IQuestionnaireService) {
    this.questionnaireService = questionnaireService
  }

  nextQuestion = async (req: Request, res: Response): Promise<Response> => {
    try {
      const professionalId = req.professional.id;
      const { patientId, questionnaireId, questionId, questionOptionsIds } = req.body;
      const { statusCode, ...response } = await this.questionnaireService.nextQuestion({
        patientId,
        professionalId,
        questionnaireId,
        questionId,
        questionOptionsIds,
      });
      return res.status(statusCode).send(response);
    } catch (err: any) {
      console.log(err);
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  }
}