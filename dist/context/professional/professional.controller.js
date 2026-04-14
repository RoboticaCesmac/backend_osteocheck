"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessionalController = void 0;
class ProfessionalController {
    constructor(professionalService) {
        this.changePassword = async (req, res) => {
            try {
                const { email, password } = req.body;
                const { statusCode, ...response } = await this.professionalService.changePassword({
                    email,
                    password,
                });
                return res.status(statusCode).send(response);
            }
            catch (err) {
                return res.status(err.statusCode || 500).send({ error: err.message });
            }
        };
        this.deleteProfessional = async (req, res) => {
            try {
                const professionalId = req.professional.id;
                const { statusCode, ...response } = await this.professionalService.deleteProfessional(Number(professionalId));
                return res.status(statusCode).send(response);
            }
            catch (err) {
                return res.status(err.statusCode || 500).send({ error: err.message });
            }
        };
        this.confirmForgotPasswordToken = async (req, res) => {
            try {
                const { email, forgotPasswordToken } = req.body;
                const { statusCode, ...response } = await this.professionalService.confirmForgotPasswordToken({
                    email,
                    forgotPasswordToken,
                });
                return res.status(statusCode).send(response);
            }
            catch (err) {
                return res.status(err.statusCode || 500).send({ error: err.message });
            }
        };
        this.sendForgotPasswordToken = async (req, res) => {
            try {
                const professionalEmail = req.body.professionalEmail;
                const { statusCode, ...response } = await this.professionalService.sendForgotPasswordToken(professionalEmail);
                return res.status(statusCode).send(response);
            }
            catch (err) {
                return res.status(err.statusCode || 500).send({ error: err.message });
            }
        };
        this.getProfessionalPatients = async (req, res) => {
            try {
                const professionalId = req.professional.id;
                const { statusCode, ...response } = await this.professionalService.getProfessionalPatients(professionalId);
                return res.status(statusCode).send(response);
            }
            catch (err) {
                return res.status(err.statusCode || 500).send({ error: err.message });
            }
        };
        this.getProfile = async (req, res) => {
            try {
                const professionalId = req.professional.id;
                const { statusCode, ...response } = await this.professionalService.getProfile(professionalId);
                return res.status(statusCode).send(response);
            }
            catch (err) {
                return res.status(err.statusCode || 500).send({ error: err.message });
            }
        };
        this.getLastQuestionnaireResponses = async (req, res) => {
            try {
                let paginationOptions = undefined;
                const professionalId = req.professional.id;
                const { page, limit } = req.query;
                if (page && limit) {
                    paginationOptions = { page: Number(page), limit: Number(limit) };
                }
                const response = await this.professionalService.getLastQuestionnaireResponses(professionalId, paginationOptions);
                return res.status(200).send(response);
            }
            catch (err) {
                return res.status(err.statusCode || 500).send({ error: err.message });
            }
        };
        this.confirmSignupToken = async (req, res) => {
            try {
                const { professionalEmail, signupToken } = req.body;
                const { statusCode, ...response } = await this.professionalService.confirmSignupToken({
                    professionalEmail,
                    signupToken,
                });
                return res.status(statusCode).send(response);
            }
            catch (err) {
                return res.status(err.statusCode || 500).send({ error: err.message });
            }
        };
        this.login = async (req, res) => {
            try {
                const { email, password } = req.body;
                const { statusCode, ...response } = await this.professionalService.login({
                    email,
                    password,
                });
                return res.status(statusCode).send(response);
            }
            catch (err) {
                return res.status(err.statusCode || 500).send({ error: err.message });
            }
        };
        this.signup = async (req, res) => {
            try {
                const { email, password, name } = req.body;
                const { statusCode, ...response } = await this.professionalService.signUp({
                    email,
                    name,
                    password,
                });
                return res.status(statusCode).send(response);
            }
            catch (err) {
                console.log(err);
                return res.status(err.statusCode || 500).send({ error: err.message });
            }
        };
        this.getAll = async (req, res) => {
            try {
                const { statusCode, ...response } = await this.professionalService.getAll();
                return res.status(statusCode).send(response);
            }
            catch (err) {
                return res.status(err.statusCode || 500).send({ error: err.message });
            }
        };
        this.professionalService = professionalService;
    }
}
exports.ProfessionalController = ProfessionalController;
