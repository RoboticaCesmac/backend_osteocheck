import { Repository } from "typeorm";
import { Admin } from "./entity/admin.entity";
import { IAdminService } from "./interface/adminService.interface";
import { ServiceResponse } from "../../utils/serviceResponse";
import { CreateAdminDTO } from "./dto/createAdmin.dto";
import { IEncrypt } from "../../commons/encrypt/encrypt.interface";
import { IJwtService } from "../../commons/jwt/jwt.interface";
import { LoginDTO } from "./dto/login.dto";
export declare class AdminService implements IAdminService {
    private adminRepository;
    private encryptService;
    private jwtService;
    constructor(adminRepository: Repository<Admin>, encryptService: IEncrypt, jwtService: IJwtService);
    private getAdminByEmail;
    create: (createAdminDTO: CreateAdminDTO) => Promise<ServiceResponse<Admin>>;
    login: (loginDTO: LoginDTO) => Promise<ServiceResponse<{
        user: Admin;
        jwt: string;
    }>>;
}
