"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableQuestionOption1771094511588 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableQuestionOption1771094511588 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'questionOptions',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: 'questionId',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'text',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'value',
                    type: 'varchar',
                    isNullable: false,
                    comment: 'Unique value for this option',
                },
                {
                    name: 'order',
                    type: 'int',
                    isNullable: false,
                    comment: 'Order of option within question',
                },
                {
                    name: 'nextQuestionId',
                    type: 'int',
                    isNullable: true,
                    comment: 'Jump to this question if option selected (branching logic)',
                },
                {
                    name: 'isTerminal',
                    type: 'boolean',
                    isNullable: false,
                    default: false,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        await queryRunner.createForeignKey('questionOptions', new typeorm_1.TableForeignKey({
            columnNames: ['questionId'],
            referencedTableName: 'questions',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('questionOptions', new typeorm_1.TableForeignKey({
            columnNames: ['nextQuestionId'],
            referencedTableName: 'questions',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
        }));
    }
    async down(queryRunner) {
    }
}
exports.CreateTableQuestionOption1771094511588 = CreateTableQuestionOption1771094511588;
