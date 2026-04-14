import { ServiceResponse } from '../../utils/serviceResponse';
import { SignupDTO } from './dto/signup.dto';
import { IProfessionalService } from './interface/professionalService.interface';
import { Professional } from './entity/professional.entity';
import { Repository } from 'typeorm';
import { LoginDTO } from './dto/login.dto';
import { IEncrypt } from '../../commons/encrypt/encrypt.interface';
import { IJwtService } from '../../commons/jwt/jwt.interface';
import { UpdateUserDTO } from './dto/update.dto';
import { ConfirmSignupTokenDTO } from './dto/confirmSignupToken.dto';
import { Patient } from '../patients/entity/patients.entity';
import { ConfirmForgotPasswordTokenDTO } from './dto/confirmForgotPasswordToken.dto';
import { ChangePasswordDTO } from './dto/changePassword.dto';
import { IEmailService } from '../../commons/email/emailService.interface';
import { QuestionnaireResponse } from '../questionnaire/entity/questionnaireResponse.entity';
import { PaginationOptions, PaginationResult } from '../../utils/pagination';
export declare class ProfessionalService implements IProfessionalService {
    private professionalRepository;
    private questionnaireResponseRepository;
    private jwtService;
    private encrypt;
    private emailService;
    constructor(professionalRepository: Repository<Professional>, encrypt: IEncrypt, jwtService: IJwtService, emailService: IEmailService, questionnaireResponseRepository: Repository<QuestionnaireResponse>);
    changePassword: (changePasswordDTO: ChangePasswordDTO) => Promise<ServiceResponse<null>>;
    sendForgotPasswordToken: (professionalEmail: string) => Promise<ServiceResponse<{
        token: string;
    }>>;
    deleteProfessional: (id: number) => Promise<ServiceResponse<null>>;
    confirmForgotPasswordToken: (confirmForgotPasswordTokenDTO: ConfirmForgotPasswordTokenDTO) => Promise<ServiceResponse<null>>;
    getProfessionalPatients: (professionalId: number) => Promise<ServiceResponse<Patient>>;
    getLastQuestionnaireResponses: (professionalId: number, paginationOptions?: PaginationOptions) => Promise<PaginationResult<QuestionnaireResponse>>;
    getProfile: (professionalId: number) => Promise<ServiceResponse<Professional>>;
    private findProfessionalByEmail;
    confirmSignupToken: (confirmSignupTokenDTO: ConfirmSignupTokenDTO) => Promise<ServiceResponse<null>>;
    findById: (id: number) => Promise<ServiceResponse<Professional>>;
    update: (updateDTO: UpdateUserDTO) => Promise<ServiceResponse<Professional>>;
    login: (loginDTO: LoginDTO) => Promise<ServiceResponse<{
        user: Professional;
        jwt: string;
    }>>;
    signUp: (signupDTO: SignupDTO) => Promise<ServiceResponse<Professional>>;
    getAll: () => Promise<ServiceResponse<Pick<Professional, "id" | "createdAt" | "email" | "name">[]>>;
}
