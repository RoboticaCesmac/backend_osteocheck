import { Request, Response } from "express";
import { IQuestionnaireService } from "./interface/questionnaireService.interface";
import { QuestionnaireType } from "./enum/questionnaireType.enum";

export class QuestionnaireController {
  private questionnaireService: IQuestionnaireService;

  constructor(questionnaireService: IQuestionnaireService) {
    this.questionnaireService = questionnaireService
  }

  nextQuestion = async (req: Request, res: Response): Promise<Response> => {
    try {
      const professionalId = req.professional.id;
      const { patientId, questionnaireType, questionId, questionOptionsIds } = req.body;
      const { statusCode, ...response } = await this.questionnaireService.nextQuestion({
        patientId,
        professionalId,
        questionnaireType,
        questionId,
        questionOptionsIds,
      });
      return res.status(statusCode).send(response);
    } catch (err: any) {
      console.log(err);
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  }

  getQuestionnaireProgress = async (req: Request, res: Response): Promise<Response> => {
    try {
      const professionalId = req.professional.id;
      const { patientId, questionnaireType } = req.query;

      const { statusCode, ...response } = await this.questionnaireService.getQuestionnaireProgress({
        patientId: Number(patientId),
        professionalId,
        questionnaireType: questionnaireType as QuestionnaireType,
      });
      return res.status(statusCode).send(response);
    } catch (err: any) {
      console.log(err);
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  }
}