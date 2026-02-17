import { DataSource, Relation, Repository } from "typeorm";
import { serviceResponse, ServiceResponse } from "../../utils/serviceResponse";
import { CreatePatientDTO } from "./dto/createPatient.dto";
import { Patient } from "./entity/patients.entity";
import { IPatientsService } from "./interface/patientsService.interface";
import { HttpResponse } from "../../utils/httpResponses";
import { ProfessionalPatients } from "../professionalPatients/entity/professionalPatients.entity";
import { IProfessionalService } from "../professional/interface/professionalService.interface";
import { Professional } from "../professional/entity/professional.entity";

export class PatientsService implements IPatientsService {
  private professionalService: IProfessionalService;
  private patientsRepository: Repository<Patient>;
  private professionalPatientsRepository: Repository<ProfessionalPatients>;
  private dataSource: DataSource;
  constructor(patientsRepository: Repository<Patient>, professionalPatientsRepository: Repository<ProfessionalPatients>, dataSource: DataSource, professionalService: IProfessionalService) {
    this.patientsRepository = patientsRepository
    this.professionalPatientsRepository = professionalPatientsRepository
    this.dataSource = dataSource
    this.professionalService = professionalService;
  }

  findById = async (patientId: number): Promise<ServiceResponse<Patient | null>> => {
    const patient = await this.patientsRepository.findOne({
      where: {
        id: patientId,
      },
    });
    return serviceResponse({
      data: patient,
      statusCode: patient ? 200 : 404,
    });
  }

  create = async (createPatientDTO: CreatePatientDTO): Promise<ServiceResponse<Patient>> => {
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
        throw HttpResponse.badRequest({
          message: 'Esse paciente já está cadastrado em sua conta!',
        });
      }
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (!patient) {
        const newPatient = new Patient();
        newPatient.cpf = createPatientDTO.cpf;
        newPatient.dateOfBirth = createPatientDTO.dateOfBirth;
        newPatient.gender = createPatientDTO.gender;
        newPatient.name = createPatientDTO.name;
        patient = await queryRunner.manager.save(Patient, newPatient);
      }

      const newProfessionalPatient = new ProfessionalPatients();
      newProfessionalPatient.patient = { id: patient.id } as Relation<Patient>;
      newProfessionalPatient.professional = { id: createPatientDTO.professionalId } as Relation<Professional>; 
      await queryRunner.manager.save(ProfessionalPatients, newProfessionalPatient);

      await queryRunner.commitTransaction();
      return serviceResponse(HttpResponse.created({
        data: patient,
        message: 'Paciente criado com sucesso!'
      }))
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}