import { ServiceResponse } from "../../../utils/serviceResponse";
import { Patient } from "../../patients/entity/patients.entity";
import { ChangePasswordDTO } from "../dto/changePassword.dto";
import { ConfirmForgotPasswordTokenDTO } from "../dto/confirmForgotPasswordToken.dto";
import { ConfirmSignupTokenDTO } from "../dto/confirmSignupToken.dto";
import { LoginDTO } from "../dto/login.dto";
import { SignupDTO } from "../dto/signup.dto";
import { UpdateUserDTO } from "../dto/update.dto";
import { Professional } from "../entity/professional.entity";
import { QuestionnaireResponse } from "../../questionnaire/entity/questionnaireResponse.entity";
import { PaginationOptions, PaginationResult } from "../../../utils/pagination";

export interface IProfessionalService {
  deleteProfessional: (id: number) => Promise<ServiceResponse<null>>;
  signUp: (signupDTO: SignupDTO) => Promise<ServiceResponse<Professional>>;
  changePassword: (changePasswordDTO: ChangePasswordDTO) => Promise<ServiceResponse<null>>;
  confirmSignupToken: (confirmSignupTokenDTO: ConfirmSignupTokenDTO) => Promise<ServiceResponse<null>>;
  confirmForgotPasswordToken: (confirmForgotPasswordTokenDTO: ConfirmForgotPasswordTokenDTO) => Promise<ServiceResponse<null>>;
  sendForgotPasswordToken: (professionalEmail: string) => Promise<ServiceResponse<{ token: string }>>;
  login: (loginDTO: LoginDTO) => Promise<ServiceResponse<{ user: Professional, jwt: string }>>;
  findById: (id: number) => Promise<ServiceResponse<Professional>>;
  getAll: () => Promise<ServiceResponse<Pick<Professional, 'id' | 'createdAt' | 'email' | 'name'>[]>>;
  update: (updateDTO: UpdateUserDTO) => Promise<ServiceResponse<Professional>>;
  getProfessionalPatients: (professionalId: number) => Promise<ServiceResponse<Patient>>;
  getProfile: (professionalId: number) => Promise<ServiceResponse<Professional>>;
  getLastQuestionnaireResponses: (professionalId: number, paginationOptions?: PaginationOptions) => Promise<PaginationResult<QuestionnaireResponse>>;
}