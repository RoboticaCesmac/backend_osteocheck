"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableProfessionalPatients1770494152766 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableProfessionalPatients1770494152766 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "professionalPatients",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "professionalId",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "patientId",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    isNullable: false,
                    default: "CURRENT_TIMESTAMP",
                },
            ],
            indices: [
                {
                    name: "IDX_PROFESSIONAL_PATIENTS_PROFESSIONAL_ID",
                    columnNames: ["professionalId"],
                },
                {
                    name: "IDX_PROFESSIONAL_PATIENTS_PATIENT_ID",
                    columnNames: ["patientId"],
                },
                {
                    name: "IDX_PROFESSIONAL_PATIENTS_UNIQUE",
                    columnNames: ["professionalId", "patientId"],
                    isUnique: true,
                },
            ],
        }));
        await queryRunner.createForeignKey("professionalPatients", new typeorm_1.TableForeignKey({
            name: "FK_PROFESSIONAL_PATIENTS_PROFESSIONAL_ID",
            columnNames: ["professionalId"],
            referencedTableName: "professionals",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
        await queryRunner.createForeignKey("professionalPatients", new typeorm_1.TableForeignKey({
            name: "FK_PROFESSIONAL_PATIENTS_PATIENT_ID",
            columnNames: ["patientId"],
            referencedTableName: "patients",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable("professionalPatients");
        if (table) {
            const foreignKeys = table.foreignKeys;
            for (const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey("professionalPatients", foreignKey);
            }
        }
        await queryRunner.dropTable("professionalPatients");
    }
}
exports.CreateTableProfessionalPatients1770494152766 = CreateTableProfessionalPatients1770494152766;
