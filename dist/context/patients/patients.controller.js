"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsController = void 0;
class PatientsController {
    constructor(patientsService) {
        this.deleteById = async (req, res) => {
            try {
                const patientId = Number(req.params.id);
                const { statusCode, ...response } = await this.patientsService.deleteById(patientId);
                return res.status(statusCode).send(response);
            }
            catch (err) {
                return res.status(err.statusCode || 500).send({ error: err.message });
            }
        };
        this.getAll = async (req, res) => {
            try {
                const { statusCode, ...response } = await this.patientsService.findAll();
                return res.status(statusCode).send(response);
            }
            catch (err) {
                return res.status(err.statusCode || 500).send({ error: err.message });
            }
        };
        this.create = async (req, res) => {
            try {
                const professionalId = req.professional.id;
                const { identifier, dateOfBirth, gender, name } = req.body;
                const { statusCode, ...response } = await this.patientsService.create({
                    professionalId,
                    dateOfBirth,
                    gender,
                    name,
                });
                return res.status(statusCode).send(response);
            }
            catch (err) {
                return res.status(err.statusCode || 500).send({ error: err.message });
            }
        };
        this.getById = async (req, res) => {
            try {
                const patientId = Number(req.params.id);
                const { statusCode, ...response } = await this.patientsService.findById(patientId);
                return res.status(statusCode).send(response);
            }
            catch (err) {
                return res.status(err.statusCode || 500).send({ error: err.message });
            }
        };
        this.patientsService = patientsService;
    }
}
exports.PatientsController = PatientsController;
