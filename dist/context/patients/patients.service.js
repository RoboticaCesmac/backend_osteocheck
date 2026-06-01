"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsService = void 0;
const serviceResponse_1 = require("../../utils/serviceResponse");
const patients_entity_1 = require("./entity/patients.entity");
const httpResponses_1 = require("../../utils/httpResponses");
const professionalPatients_entity_1 = require("../professionalPatients/entity/professionalPatients.entity");
const randomCodeGenerator_1 = require("../../utils/randomCodeGenerator");
class PatientsService {
    constructor(patientsRepository, professionalPatientsRepository, dataSource, professionalService) {
        this.deleteById = async (patientId) => {
            const patient = await this.patientsRepository.findOne({
                where: {
                    id: patientId,
                },
            });
            if (!patient) {
                throw httpResponses_1.HttpResponse.notFound({
                    message: 'Paciente não encontrado!',
                });
            }
            await this.patientsRepository.softRemove(patient);
            return (0, serviceResponse_1.serviceResponse)({
                data: patient,
                statusCode: 200,
            });
        };
        this.findAll = async () => {
            const patients = await this.patientsRepository.find();
            return (0, serviceResponse_1.serviceResponse)({
                data: patients,
                statusCode: 200,
            });
        };
        this.findById = async (patientId) => {
            const patient = await this.patientsRepository.findOne({
                relations: {
                    questionnaireResponses: {
                        professional: true,
                    },
                },
                where: {
                    id: patientId,
                },
            });
            return (0, serviceResponse_1.serviceResponse)({
                data: patient,
                statusCode: patient ? 200 : 404,
            });
        };
        this.randomUniquePatientIdentifierVerificatorAndGenerator = async () => {
            let newRandomIdentifier = (0, randomCodeGenerator_1.randomCodeGenerator)(6);
            let foundPatient = {};
            while (foundPatient !== null) {
                foundPatient = await this.patientsRepository.findOne({
                    where: {
                        identifier: newRandomIdentifier,
                    },
                });
                if (!foundPatient) {
                    break;
                }
                newRandomIdentifier = (0, randomCodeGenerator_1.randomCodeGenerator)(6);
            }
            return newRandomIdentifier;
        };
        this.create = async (createPatientDTO) => {
            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            try {
                const newPatientRandomIdentifier = await this.randomUniquePatientIdentifierVerificatorAndGenerator();
                const newPatient = new patients_entity_1.Patient();
                newPatient.dateOfBirth = createPatientDTO.dateOfBirth;
                newPatient.gender = createPatientDTO.gender;
                newPatient.name = createPatientDTO.name;
                newPatient.identifier = newPatientRandomIdentifier;
                const patient = await queryRunner.manager.save(patients_entity_1.Patient, newPatient);
                const newProfessionalPatient = new professionalPatients_entity_1.ProfessionalPatients();
                newProfessionalPatient.patient = { id: patient.id };
                newProfessionalPatient.professional = { id: createPatientDTO.professionalId };
                await queryRunner.manager.save(professionalPatients_entity_1.ProfessionalPatients, newProfessionalPatient);
                await queryRunner.commitTransaction();
                return (0, serviceResponse_1.serviceResponse)(httpResponses_1.HttpResponse.created({
                    data: patient,
                    message: 'Paciente criado com sucesso!'
                }));
            }
            catch (err) {
                await queryRunner.rollbackTransaction();
                throw err;
            }
            finally {
                await queryRunner.release();
            }
        };
        this.patientsRepository = patientsRepository;
        this.professionalPatientsRepository = professionalPatientsRepository;
        this.dataSource = dataSource;
        this.professionalService = professionalService;
    }
}
exports.PatientsService = PatientsService;
