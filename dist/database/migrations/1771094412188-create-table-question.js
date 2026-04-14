"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableQuestion1771094412188 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableQuestion1771094412188 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'questions',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: 'groupId',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'text',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'type',
                    type: 'enum',
                    enum: ['text', 'singleChoice', 'multipleChoice', 'date', 'number'],
                    default: "'singleChoice'",
                },
                {
                    name: 'order',
                    type: 'int',
                    isNullable: false,
                    comment: 'Order of question within group',
                },
                {
                    name: 'isRequired',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'helpText',
                    type: 'text',
                    isNullable: true,
                    comment: 'Additional guidance for the question',
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
        await queryRunner.createForeignKey('questions', new typeorm_1.TableForeignKey({
            columnNames: ['groupId'],
            referencedTableName: 'questionGroups',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
        await queryRunner.createIndex('questions', new typeorm_1.TableIndex({
            columnNames: ['groupId', 'order'],
        }));
    }
    async down(queryRunner) {
    }
}
exports.CreateTableQuestion1771094412188 = CreateTableQuestion1771094412188;
