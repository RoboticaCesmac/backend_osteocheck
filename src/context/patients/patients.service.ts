import { DataSource, Relation, Repository, Transaction } from "typeorm";
import { serviceResponse, ServiceResponse } from "../../utils/serviceResponse";
import { CreatePatientDTO } from "./dto/createPatient.dto";
import { Patient } from "./entity/patients.entity";
import { IPatientsService } from "./interface/patientsService.interface";
import { HttpResponse } from "../../utils/httpResponses";
import { ProfessionalPatients } from "../professionalPatients/entity/professionalPatients.entity";
import { IProfessionalService } from "../professional/interface/professionalService.interface";
import { Professional } from "../professional/entity/professional.entity";
import { randomCodeGenerator } from "../../utils/randomCodeGenerator";

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

  deleteById = async (patientId: number): Promise<ServiceResponse<Patient | null>> => {
    const patient = await this.patientsRepository.findOne({
      where: {
        id: patientId,
      },
    });
    if (!patient) {
      throw HttpResponse.notFound({
        message: 'Paciente não encontrado!',
      });
    }
    await this.patientsRepository.softRemove(patient);
    return serviceResponse({
      data: patient,
      statusCode: 200,
    });
  }

  findAll = async (): Promise<ServiceResponse<Patient[]>> => {
    const patients = await this.patientsRepository.find();
    return serviceResponse({
      data: patients,
      statusCode: 200,
    });
  }

  findById = async (patientId: number): Promise<ServiceResponse<Patient | null>> => {
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
    return serviceResponse({
      data: patient,
      statusCode: patient ? 200 : 404,
    });
  }

  private randomUniquePatientIdentifierVerificatorAndGenerator = async () => {
    let newRandomIdentifier = randomCodeGenerator(6);
    let foundPatient: Patient | null = {} as Patient;
    while (foundPatient !== null) {
      foundPatient = await this.patientsRepository.findOne({
        where: {
          identifier: newRandomIdentifier,
        },
      });
      if (!foundPatient) {
        break;
      }
      newRandomIdentifier = randomCodeGenerator(6);
    }
    return newRandomIdentifier;
  }

  create = async (createPatientDTO: CreatePatientDTO): Promise<ServiceResponse<Patient>> => {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newPatientRandomIdentifier = await this.randomUniquePatientIdentifierVerificatorAndGenerator();
      const newPatient = new Patient();
      newPatient.dateOfBirth = createPatientDTO.dateOfBirth;
      newPatient.gender = createPatientDTO.gender;
      newPatient.name = createPatientDTO.name;
      newPatient.identifier = newPatientRandomIdentifier;
      const patient = await queryRunner.manager.save(Patient, newPatient);

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