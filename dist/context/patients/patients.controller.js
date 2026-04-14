"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsController = void 0;
class PatientsController {
    constructor(patientsService) {
        this.create = async (req, res) => {
            try {
                const professionalId = req.professional.id;
                const { cpf, dateOfBirth, gender, name } = req.body;
                const { statusCode, ...response } = await this.patientsService.create({
                    professionalId,
                    cpf,
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
