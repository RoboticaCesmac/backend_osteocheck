"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProfessionalsTable1770336436674 = void 0;
const typeorm_1 = require("typeorm");
class CreateProfessionalsTable1770336436674 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "professionals",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false,
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
                    name: "accountConfirmationToken",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "forgotPasswordToken",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "hasConfirmedAccount",
                    type: "boolean",
                    isNullable: false,
                    default: false,
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
                    name: "IDX_PROFESSIONALS_EMAIL",
                    columnNames: ["email"],
                },
                {
                    name: "IDX_PROFESSIONALS_DELETED_AT",
                    columnNames: ["deletedAt"],
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("professionals");
    }
}
exports.CreateProfessionalsTable1770336436674 = CreateProfessionalsTable1770336436674;
