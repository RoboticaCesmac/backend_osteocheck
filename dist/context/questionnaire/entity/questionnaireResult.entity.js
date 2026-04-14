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
exports.QuestionnaireResult = void 0;
const typeorm_1 = require("typeorm");
const questionnaireResultType_enum_1 = require("../enum/questionnaireResultType.enum");
const questionnaireResponse_entity_1 = require("./questionnaireResponse.entity");
let QuestionnaireResult = class QuestionnaireResult {
};
exports.QuestionnaireResult = QuestionnaireResult;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], QuestionnaireResult.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], QuestionnaireResult.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => questionnaireResponse_entity_1.QuestionnaireResponse, (response) => response.result),
    __metadata("design:type", questionnaireResponse_entity_1.QuestionnaireResponse)
], QuestionnaireResult.prototype, "response", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: questionnaireResultType_enum_1.QuestionnaireResultType,
    }),
    __metadata("design:type", String)
], QuestionnaireResult.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], QuestionnaireResult.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], QuestionnaireResult.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], QuestionnaireResult.prototype, "deletedAt", void 0);
exports.QuestionnaireResult = QuestionnaireResult = __decorate([
    (0, typeorm_1.Entity)('questionnaireResults')
], QuestionnaireResult);
