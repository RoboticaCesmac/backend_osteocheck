"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableQuestionnaireResponse1771094646513 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableQuestionnaireResponse1771094646513 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'questionnaireResponses',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: 'questionnaireId',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'professionalId',
                    type: 'int',
                    isNullable: false,
                    comment: 'Professional filling the questionnaire',
                },
                {
                    name: 'patientId',
                    type: 'int',
                    isNullable: false,
                    comment: 'Patient the questionnaire is for',
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ['inProgress', 'completed', 'abandoned'],
                    default: "'inProgress'",
                },
                {
                    name: 'questionnaireResultId',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'completedAt',
                    type: 'timestamp',
                    isNullable: true,
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
        await queryRunner.createForeignKey('questionnaireResponses', new typeorm_1.TableForeignKey({
            columnNames: ['questionnaireResultId'],
            referencedTableName: 'questionnaireResults',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('questionnaireResponses', new typeorm_1.TableForeignKey({
            columnNames: ['questionnaireId'],
            referencedTableName: 'questionnaires',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
        await queryRunner.createIndex('questionnaireResponses', new typeorm_1.TableIndex({
            columnNames: ['questionnaireId'],
        }));
        await queryRunner.createIndex('questionnaireResponses', new typeorm_1.TableIndex({
            columnNames: ['professionalId'],
        }));
        await queryRunner.createIndex('questionnaireResponses', new typeorm_1.TableIndex({
            columnNames: ['patientId'],
        }));
    }
    async down(queryRunner) {
    }
}
exports.CreateTableQuestionnaireResponse1771094646513 = CreateTableQuestionnaireResponse1771094646513;
