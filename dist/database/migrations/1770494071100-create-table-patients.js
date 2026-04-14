"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTablePatients1770494071100 = void 0;
const typeorm_1 = require("typeorm");
class CreateTablePatients1770494071100 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "patients",
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
                    name: "cpf",
                    type: "varchar",
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: "dateOfBirth",
                    type: "date",
                    isNullable: false,
                },
                {
                    name: "gender",
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
                    name: "IDX_PATIENTS_CPF",
                    columnNames: ["cpf"],
                },
                {
                    name: "IDX_PATIENTS_DELETED_AT",
                    columnNames: ["deletedAt"],
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("patients");
    }
}
exports.CreateTablePatients1770494071100 = CreateTablePatients1770494071100;
