import { DataSource, Repository } from "typeorm";
import { ServiceResponse } from "../../utils/serviceResponse";
import { CreatePatientDTO } from "./dto/createPatient.dto";
import { Patient } from "./entity/patients.entity";
import { IPatientsService } from "./interface/patientsService.interface";
import { ProfessionalPatients } from "../professionalPatients/entity/professionalPatients.entity";
import { IProfessionalService } from "../professional/interface/professionalService.interface";
export declare class PatientsService implements IPatientsService {
    private professionalService;
    private patientsRepository;
    private professionalPatientsRepository;
    private dataSource;
    constructor(patientsRepository: Repository<Patient>, professionalPatientsRepository: Repository<ProfessionalPatients>, dataSource: DataSource, professionalService: IProfessionalService);
    findById: (patientId: number) => Promise<ServiceResponse<Patient | null>>;
    create: (createPatientDTO: CreatePatientDTO) => Promise<ServiceResponse<Patient>>;
}
