import { Encrypt } from "../../commons/encrypt/encrypt";
import { JWTService } from "../../commons/jwt/jwt";
import { AppDataSource } from "../../database/dbConnection";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { Admin } from "./entity/admin.entity";
import { IAdminService } from "./interface/adminService.interface";

export function createAdminController(): AdminController {
    const adminService = createAdminService();
    return new AdminController(adminService);
}

export function createAdminService(): IAdminService {
    const adminRepository = AppDataSource.getRepository(Admin);
    const encryptService = new Encrypt();
    const jwtService = new JWTService();
    return new AdminService(adminRepository, encryptService, jwtService);
}