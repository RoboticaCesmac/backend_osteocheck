import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateTableQuestionnaireResponse1771094646513 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
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
            }),
            true,
        );

        await queryRunner.createForeignKey(
            'questionnaireResponses',
            new TableForeignKey({
                columnNames: ['questionnaireResultId'],
                referencedTableName: 'questionnaireResults',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            })
        )

        await queryRunner.createForeignKey(
            'questionnaireResponses',
            new TableForeignKey({
                columnNames: ['questionnaireId'],
                referencedTableName: 'questionnaires',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createIndex(
            'questionnaireResponses',
            new TableIndex({
                columnNames: ['questionnaireId'],
            }),
        );

        await queryRunner.createIndex(
            'questionnaireResponses',
            new TableIndex({
                columnNames: ['professionalId'],
            }),
        );

        await queryRunner.createIndex(
            'questionnaireResponses',
            new TableIndex({
                columnNames: ['patientId'],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
