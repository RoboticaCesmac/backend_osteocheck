import { Request, Response } from "express";
import { IQuestionnaireService } from "./interface/questionnaireService.interface";
export declare class QuestionnaireController {
    private questionnaireService;
    constructor(questionnaireService: IQuestionnaireService);
    nextQuestion: (req: Request, res: Response) => Promise<Response>;
    getQuestionnaireProgress: (req: Request, res: Response) => Promise<Response>;
    generatePdf: (req: Request, res: Response) => Promise<Response | void>;
}
