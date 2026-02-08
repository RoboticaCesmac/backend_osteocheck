import { ServiceResponse } from "../../../utils/serviceResponse";
import { Patient } from "../../patients/entity/patients.entity";
import { ConfirmForgotPasswordTokenDTO } from "../dto/confirmForgotPasswordToken.dto";
import { ConfirmSignupTokenDTO } from "../dto/confirmSignupToken.dto";
import { LoginDTO } from "../dto/login.dto";
import { SignupDTO } from "../dto/signup.dto";
import { UpdateUserDTO } from "../dto/update.dto";
import { Professional } from "../entity/professional.entity";

export interface IProfessionalService {
  signUp: (signupDTO: SignupDTO) => Promise<ServiceResponse<Professional>>;
  confirmSignupToken: (confirmSignupTokenDTO: ConfirmSignupTokenDTO) => Promise<ServiceResponse<null>>;
  confirmForgotPasswordToken: (confirmForgotPasswordTokenDTO: ConfirmForgotPasswordTokenDTO) => Promise<ServiceResponse<null>>;
  sendForgotPasswordToken: (professionalEmail: string) => Promise<ServiceResponse<{ token: string }>>;
  login: (loginDTO: LoginDTO) => Promise<ServiceResponse<{ user: Professional, jwt: string }>>;
  findById: (id: number) => Promise<ServiceResponse<Professional>>;
  getAll: () => Promise<ServiceResponse<Pick<Professional, 'id' | 'createdAt' | 'email' | 'name'>[]>>;
  update: (updateDTO: UpdateUserDTO) => Promise<ServiceResponse<Professional>>;
  getProfessionalPatients: (professionalId: number) => Promise<ServiceResponse<Patient>>;
}