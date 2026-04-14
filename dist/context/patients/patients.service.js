"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsService = void 0;
const serviceResponse_1 = require("../../utils/serviceResponse");
const patients_entity_1 = require("./entity/patients.entity");
const httpResponses_1 = require("../../utils/httpResponses");
const professionalPatients_entity_1 = require("../professionalPatients/entity/professionalPatients.entity");
class PatientsService {
    constructor(patientsRepository, professionalPatientsRepository, dataSource, professionalService) {
        this.findById = async (patientId) => {
            const patient = await this.patientsRepository.findOne({
                relations: {
                    questionnaireResponses: true,
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
        this.create = async (createPatientDTO) => {
            await this.professionalService.findById(createPatientDTO.professionalId);
            let patient = await this.patientsRepository.findOne({
                where: {
                    cpf: createPatientDTO.cpf,
                },
            });
            if (patient) {
                const thisProfessionalPatient = await this.professionalPatientsRepository.findOne({
                    where: {
                        patient: {
                            id: patient.id,
                        },
                        professional: {
                            id: createPatientDTO.professionalId,
                        }
                    },
                });
                if (thisProfessionalPatient) {
                    throw httpResponses_1.HttpResponse.badRequest({
                        message: 'Esse paciente já está cadastrado em sua conta!',
                    });
                }
            }
            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            try {
                if (!patient) {
                    const newPatient = new patients_entity_1.Patient();
                    newPatient.cpf = createPatientDTO.cpf;
                    newPatient.dateOfBirth = createPatientDTO.dateOfBirth;
                    newPatient.gender = createPatientDTO.gender;
                    newPatient.name = createPatientDTO.name;
                    patient = await queryRunner.manager.save(patients_entity_1.Patient, newPatient);
                }
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
