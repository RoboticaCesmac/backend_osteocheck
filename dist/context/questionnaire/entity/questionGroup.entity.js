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
exports.QuestionGroup = void 0;
const typeorm_1 = require("typeorm");
const questionnaire_entity_1 = require("./questionnaire.entity");
const question_entity_1 = require("./question.entity");
let QuestionGroup = class QuestionGroup {
};
exports.QuestionGroup = QuestionGroup;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('identity'),
    __metadata("design:type", String)
], QuestionGroup.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", String)
], QuestionGroup.prototype, "questionnaireId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255 }),
    __metadata("design:type", String)
], QuestionGroup.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], QuestionGroup.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { comment: 'Order of group within questionnaire' }),
    __metadata("design:type", Number)
], QuestionGroup.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false, comment: 'Whether this is the starting group' }),
    __metadata("design:type", Boolean)
], QuestionGroup.prototype, "isInitial", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], QuestionGroup.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], QuestionGroup.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => questionnaire_entity_1.Questionnaire, (questionnaire) => questionnaire.groups, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'questionnaireId' }),
    __metadata("design:type", questionnaire_entity_1.Questionnaire)
], QuestionGroup.prototype, "questionnaire", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => question_entity_1.Question, (question) => question.group, { cascade: true }),
    __metadata("design:type", Array)
], QuestionGroup.prototype, "questions", void 0);
exports.QuestionGroup = QuestionGroup = __decorate([
    (0, typeorm_1.Entity)('questionGroups')
], QuestionGroup);
