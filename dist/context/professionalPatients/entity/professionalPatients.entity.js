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
exports.ProfessionalPatients = void 0;
const typeorm_1 = require("typeorm");
const professional_entity_1 = require("../../professional/entity/professional.entity");
const patients_entity_1 = require("../../patients/entity/patients.entity");
let ProfessionalPatients = class ProfessionalPatients {
};
exports.ProfessionalPatients = ProfessionalPatients;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProfessionalPatients.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'professionalId'
    }),
    __metadata("design:type", Number)
], ProfessionalPatients.prototype, "professionalId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'patientId'
    }),
    __metadata("design:type", Number)
], ProfessionalPatients.prototype, "patientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => professional_entity_1.Professional, (professional) => professional.patients),
    (0, typeorm_1.JoinColumn)({
        name: 'professionalId'
    }),
    __metadata("design:type", professional_entity_1.Professional)
], ProfessionalPatients.prototype, "professional", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({
        name: 'patientId'
    }),
    (0, typeorm_1.ManyToOne)(() => patients_entity_1.Patient, (patient) => patient.professionalRelations),
    __metadata("design:type", patients_entity_1.Patient)
], ProfessionalPatients.prototype, "patient", void 0);
exports.ProfessionalPatients = ProfessionalPatients = __decorate([
    (0, typeorm_1.Entity)({
        name: "professionalPatients",
    })
], ProfessionalPatients);
