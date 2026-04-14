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
exports.QuestionResponseAnswer = void 0;
const typeorm_1 = require("typeorm");
const questionnaireResponse_entity_1 = require("./questionnaireResponse.entity");
const question_entity_1 = require("./question.entity");
const questionOption_entity_1 = require("./questionOption.entity");
let QuestionResponseAnswer = class QuestionResponseAnswer {
};
exports.QuestionResponseAnswer = QuestionResponseAnswer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", Number)
], QuestionResponseAnswer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], QuestionResponseAnswer.prototype, "responseId", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], QuestionResponseAnswer.prototype, "questionId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true, comment: 'For choice-based answers' }),
    __metadata("design:type", Object)
], QuestionResponseAnswer.prototype, "optionId", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true, comment: 'For text/number/date answers' }),
    __metadata("design:type", Object)
], QuestionResponseAnswer.prototype, "textAnswer", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], QuestionResponseAnswer.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], QuestionResponseAnswer.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => questionnaireResponse_entity_1.QuestionnaireResponse, (response) => response.answers, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'responseId' }),
    __metadata("design:type", questionnaireResponse_entity_1.QuestionnaireResponse)
], QuestionResponseAnswer.prototype, "response", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => question_entity_1.Question, (question) => question.answers, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'questionId' }),
    __metadata("design:type", question_entity_1.Question)
], QuestionResponseAnswer.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => questionOption_entity_1.QuestionOption, (option) => option.answers, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'optionId' }),
    __metadata("design:type", Object)
], QuestionResponseAnswer.prototype, "option", void 0);
exports.QuestionResponseAnswer = QuestionResponseAnswer = __decorate([
    (0, typeorm_1.Entity)('questionResponseAnswers')
], QuestionResponseAnswer);
