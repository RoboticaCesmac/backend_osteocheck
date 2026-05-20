import { ServiceResponse } from "../../../utils/serviceResponse";
import { CreateAdminDTO } from "../dto/createAdmin.dto";
import { LoginDTO } from "../dto/login.dto";
import { Admin } from "../entity/admin.entity";

export interface IAdminService {
    create: (createAdminDTO: CreateAdminDTO) => Promise<ServiceResponse<Admin>>;
    login: (loginDTO: LoginDTO) => Promise<ServiceResponse<{ user: Admin; jwt: string }>>;
}