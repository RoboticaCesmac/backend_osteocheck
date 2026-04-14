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
exports.QuestionOption = void 0;
const typeorm_1 = require("typeorm");
const question_entity_1 = require("./question.entity");
const questionnaireResponseAnswer_entity_1 = require("./questionnaireResponseAnswer.entity");
let QuestionOption = class QuestionOption {
};
exports.QuestionOption = QuestionOption;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('identity'),
    __metadata("design:type", Number)
], QuestionOption.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], QuestionOption.prototype, "questionId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255 }),
    __metadata("design:type", String)
], QuestionOption.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, comment: 'Unique value for this option' }),
    __metadata("design:type", String)
], QuestionOption.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { comment: 'Order of option within question' }),
    __metadata("design:type", Number)
], QuestionOption.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { nullable: false, default: false }),
    __metadata("design:type", Boolean)
], QuestionOption.prototype, "isTerminal", void 0);
__decorate([
    (0, typeorm_1.Column)('int', {
        nullable: true,
        comment: 'Jump to this question if option selected (branching logic)',
    }),
    __metadata("design:type", Object)
], QuestionOption.prototype, "nextQuestionId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], QuestionOption.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => question_entity_1.Question, (question) => question.options, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'questionId' }),
    __metadata("design:type", question_entity_1.Question)
], QuestionOption.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => question_entity_1.Question, { onDelete: 'SET NULL', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'nextQuestionId' }),
    __metadata("design:type", Object)
], QuestionOption.prototype, "nextQuestion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => questionnaireResponseAnswer_entity_1.QuestionResponseAnswer, (answer) => answer.option),
    __metadata("design:type", Array)
], QuestionOption.prototype, "answers", void 0);
exports.QuestionOption = QuestionOption = __decorate([
    (0, typeorm_1.Entity)('questionOptions')
], QuestionOption);
