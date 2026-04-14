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
exports.Question = void 0;
const typeorm_1 = require("typeorm");
const questionType_enum_1 = require("../enum/questionType.enum");
const questionGroup_entity_1 = require("./questionGroup.entity");
const questionOption_entity_1 = require("./questionOption.entity");
const questionnaireResponseAnswer_entity_1 = require("./questionnaireResponseAnswer.entity");
let Question = class Question {
};
exports.Question = Question;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('identity'),
    __metadata("design:type", Number)
], Question.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", String)
], Question.prototype, "groupId", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Question.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: questionType_enum_1.QuestionType, default: questionType_enum_1.QuestionType.SINGLE_CHOICE }),
    __metadata("design:type", String)
], Question.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { comment: 'Order of question within group' }),
    __metadata("design:type", Number)
], Question.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: true }),
    __metadata("design:type", Boolean)
], Question.prototype, "isRequired", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true, comment: 'Additional guidance for the question' }),
    __metadata("design:type", String)
], Question.prototype, "helpText", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Question.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Question.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => questionGroup_entity_1.QuestionGroup, (group) => group.questions, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'groupId' }),
    __metadata("design:type", questionGroup_entity_1.QuestionGroup)
], Question.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => questionOption_entity_1.QuestionOption, (option) => option.question, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Question.prototype, "options", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => questionnaireResponseAnswer_entity_1.QuestionResponseAnswer, (answer) => answer.question),
    __metadata("design:type", Array)
], Question.prototype, "answers", void 0);
exports.Question = Question = __decorate([
    (0, typeorm_1.Entity)('questions')
], Question);
