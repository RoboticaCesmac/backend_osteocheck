"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnaireController = void 0;
class QuestionnaireController {
    constructor(questionnaireService) {
        this.nextQuestion = async (req, res) => {
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
            }
            catch (err) {
                console.log(err);
                return res.status(err.statusCode || 500).send({ error: err.message });
            }
        };
        this.getQuestionnaireProgress = async (req, res) => {
            try {
                const professionalId = req.professional.id;
                const { patientId, questionnaireType } = req.query;
                const { statusCode, ...response } = await this.questionnaireService.getQuestionnaireProgress({
                    patientId: Number(patientId),
                    professionalId,
                    questionnaireType: questionnaireType,
                });
                return res.status(statusCode).send(response);
            }
            catch (err) {
                console.log(err);
                return res.status(err.statusCode || 500).send({ error: err.message });
            }
        };
        this.generatePdf = async (req, res) => {
            try {
                const professionalId = req.professional.id;
                const id = Number(req.params.id);
                const response = await this.questionnaireService.generatePdf({
                    id,
                    professionalId,
                });
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', `attachment; filename=relatorio-${id}.pdf`);
                return res.status(response.statusCode).send(response.data);
            }
            catch (err) {
                console.log(err);
                return res.status(err.statusCode || 500).send({ error: err.message });
            }
        };
        this.questionnaireService = questionnaireService;
    }
}
exports.QuestionnaireController = QuestionnaireController;
