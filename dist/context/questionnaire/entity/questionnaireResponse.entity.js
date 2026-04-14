"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnaireResponse = void 0;
const typeorm_1 = require("typeorm");
const responseStatus_enum_1 = require("../enum/responseStatus.enum");
const questionnaire_entity_1 = require("./questionnaire.entity");
const questionnaireResponseAnswer_entity_1 = require("./questionnaireResponseAnswer.entity");
const questionnaireResult_entity_1 = require("./questionnaireResult.entity");
const patients_entity_1 = require("../../patients/entity/patients.entity");
let QuestionnaireResponse = class QuestionnaireResponse {
};
exports.QuestionnaireResponse = QuestionnaireResponse;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('identity'),
    __metadata("design:type", Number)
], QuestionnaireResponse.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], QuestionnaireResponse.prototype, "questionnaireId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { comment: 'Professional filling the questionnaire' }),
    __metadata("design:type", Number)
], QuestionnaireResponse.prototype, "professionalId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { comment: 'Patient the questionnaire is for' }),
    __metadata("design:type", Number)
], QuestionnaireResponse.prototype, "patientId", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: responseStatus_enum_1.ResponseStatus, default: responseStatus_enum_1.ResponseStatus.IN_PROGRESS }),
    __metadata("design:type", String)
], QuestionnaireResponse.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { nullable: true }),
    __metadata("design:type", Object)
], QuestionnaireResponse.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], QuestionnaireResponse.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], QuestionnaireResponse.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => questionnaire_entity_1.Questionnaire, (questionnaire) => questionnaire.responses, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'questionnaireId' }),
    __metadata("design:type", questionnaire_entity_1.Questionnaire)
], QuestionnaireResponse.prototype, "questionnaire", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => patients_entity_1.Patient, (patient) => patient.questionnaireResponses, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'patientId' }),
    __metadata("design:type", patients_entity_1.Patient)
], QuestionnaireResponse.prototype, "patient", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => questionnaireResult_entity_1.QuestionnaireResult, (result) => result),
    (0, typeorm_1.JoinColumn)({ name: 'questionnaireResultId' }),
    __metadata("design:type", questionnaireResult_entity_1.QuestionnaireResult)
], QuestionnaireResponse.prototype, "result", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => questionnaireResponseAnswer_entity_1.QuestionResponseAnswer, (answer) => answer.response, { cascade: true }),
    __metadata("design:type", Array)
], QuestionnaireResponse.prototype, "answers", void 0);
exports.QuestionnaireResponse = QuestionnaireResponse = __decorate([
    (0, typeorm_1.Entity)('questionnaireResponses')
], QuestionnaireResponse);
