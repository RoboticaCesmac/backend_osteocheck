import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProfessionalsTable1770336436674 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
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
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("professionals");
    }

}
