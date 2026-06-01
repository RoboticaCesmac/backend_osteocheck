"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAdminsTable1778206135591 = void 0;
const typeorm_1 = require("typeorm");
class CreateAdminsTable1778206135591 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "admins",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "email",
                    type: "varchar",
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    isNullable: false,
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    isNullable: false,
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "deletedAt",
                    type: "timestamp",
                    isNullable: true,
                },
            ],
            indices: [
                {
                    name: "IDX_ADMINS_EMAIL",
                    columnNames: ["email"],
                },
                {
                    name: "IDX_ADMINS_DELETED_AT",
                    columnNames: ["deletedAt"],
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("admins");
    }
}
exports.CreateAdminsTable1778206135591 = CreateAdminsTable1778206135591;
