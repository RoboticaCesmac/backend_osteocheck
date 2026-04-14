"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableQuestionGroup1771094275855 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableQuestionGroup1771094275855 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'questionGroups',
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
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'order',
                    type: 'int',
                    isNullable: false,
                    comment: 'Order of group within questionnaire',
                },
                {
                    name: 'isInitial',
                    type: 'boolean',
                    default: false,
                    comment: 'Whether this is the starting group',
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
        await queryRunner.createForeignKey('questionGroups', new typeorm_1.TableForeignKey({
            columnNames: ['questionnaireId'],
            referencedTableName: 'questionnaires',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
        await queryRunner.createIndex('questionGroups', new typeorm_1.TableIndex({
            columnNames: ['questionnaireId', 'order'],
        }));
    }
    async down(queryRunner) {
    }
}
exports.CreateTableQuestionGroup1771094275855 = CreateTableQuestionGroup1771094275855;
