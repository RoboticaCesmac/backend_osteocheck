"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminController = createAdminController;
exports.createAdminService = createAdminService;
const encrypt_1 = require("../../commons/encrypt/encrypt");
const jwt_1 = require("../../commons/jwt/jwt");
const dbConnection_1 = require("../../database/dbConnection");
const admin_controller_1 = require("./admin.controller");
const admin_service_1 = require("./admin.service");
const admin_entity_1 = require("./entity/admin.entity");
function createAdminController() {
    const adminService = createAdminService();
    return new admin_controller_1.AdminController(adminService);
}
function createAdminService() {
    const adminRepository = dbConnection_1.AppDataSource.getRepository(admin_entity_1.Admin);
    const encryptService = new encrypt_1.Encrypt();
    const jwtService = new jwt_1.JWTService();
    return new admin_service_1.AdminService(adminRepository, encryptService, jwtService);
}
