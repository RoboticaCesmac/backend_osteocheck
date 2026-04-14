"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableQuestionnaire1771094227249 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableQuestionnaire1771094227249 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'questionnaires',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: 'title',
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
                    name: 'type',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'isActive',
                    type: 'boolean',
                    default: true,
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
    }
    async down(queryRunner) {
    }
}
exports.CreateTableQuestionnaire1771094227249 = CreateTableQuestionnaire1771094227249;
