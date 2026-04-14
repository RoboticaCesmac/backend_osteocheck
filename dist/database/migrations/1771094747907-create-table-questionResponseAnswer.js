"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableQuestionResponseAnswer1771094747907 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableQuestionResponseAnswer1771094747907 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'questionResponseAnswers',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: 'responseId',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'questionId',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'optionId',
                    type: 'int',
                    isNullable: true,
                    comment: 'For choice-based answers',
                },
                {
                    name: 'textAnswer',
                    type: 'text',
                    isNullable: true,
                    comment: 'For text/number/date answers',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        await queryRunner.createForeignKey('questionResponseAnswers', new typeorm_1.TableForeignKey({
            columnNames: ['responseId'],
            referencedTableName: 'questionnaireResponses',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('questionResponseAnswers', new typeorm_1.TableForeignKey({
            columnNames: ['questionId'],
            referencedTableName: 'questions',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('questionResponseAnswers', new typeorm_1.TableForeignKey({
            columnNames: ['optionId'],
            referencedTableName: 'questionOptions',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
        }));
        await queryRunner.createIndex('questionResponseAnswers', new typeorm_1.TableIndex({
            columnNames: ['responseId'],
        }));
    }
    async down(queryRunner) {
    }
}
exports.CreateTableQuestionResponseAnswer1771094747907 = CreateTableQuestionResponseAnswer1771094747907;
