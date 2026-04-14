"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPatientsController = createPatientsController;
exports.createPatientsService = createPatientsService;
const dbConnection_1 = require("../../database/dbConnection");
const professional_factory_1 = require("../professional/professional.factory");
const professionalPatients_entity_1 = require("../professionalPatients/entity/professionalPatients.entity");
const patients_entity_1 = require("./entity/patients.entity");
const patients_controller_1 = require("./patients.controller");
const patients_service_1 = require("./patients.service");
function createPatientsController() {
    const patientsService = createPatientsService();
    return new patients_controller_1.PatientsController(patientsService);
}
;
function createPatientsService() {
    const professionalService = (0, professional_factory_1.createProfessionalService)();
    const appDataSource = dbConnection_1.AppDataSource;
    const patientsRepository = dbConnection_1.AppDataSource.getRepository(patients_entity_1.Patient);
    const professionalPatientsRepository = dbConnection_1.AppDataSource.getRepository(professionalPatients_entity_1.ProfessionalPatients);
    return new patients_service_1.PatientsService(patientsRepository, professionalPatientsRepository, appDataSource, professionalService);
}
