"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProfessionalController = createProfessionalController;
exports.createProfessionalService = createProfessionalService;
const dbConnection_1 = require("../../database/dbConnection");
const professional_controller_1 = require("./professional.controller");
const professional_service_1 = require("./professional.service");
const professional_entity_1 = require("./entity/professional.entity");
const encrypt_1 = require("../../commons/encrypt/encrypt");
const jwt_1 = require("../../commons/jwt/jwt");
const questionnaireResponse_entity_1 = require("../questionnaire/entity/questionnaireResponse.entity");
const gmailEmail_service_1 = __importDefault(require("../../commons/email/gmailEmail.service"));
function createProfessionalController() {
    const professionalService = createProfessionalService();
    return new professional_controller_1.ProfessionalController(professionalService);
}
function createProfessionalService() {
    const jwtService = new jwt_1.JWTService();
    const encrypt = new encrypt_1.Encrypt();
    const userRepository = dbConnection_1.AppDataSource.getRepository(professional_entity_1.Professional);
    const questionnaireResponseRepository = dbConnection_1.AppDataSource.getRepository(questionnaireResponse_entity_1.QuestionnaireResponse);
    return new professional_service_1.ProfessionalService(userRepository, encrypt, jwtService, gmailEmail_service_1.default, questionnaireResponseRepository);
}
