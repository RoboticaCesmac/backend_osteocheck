import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateTableQuestionResponseAnswer1771094747907 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'questionResponseAnswers',
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: 'responseId',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'questionId',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'optionId',
                        type: 'int',
                        isNullable: true,
                        comment: 'For choice-based answers',
                    },
                    {
                        name: 'textAnswer',
                        type: 'text',
                        isNullable: true,
                        comment: 'For text/number/date answers',
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
            'questionResponseAnswers',
            new TableForeignKey({
                columnNames: ['responseId'],
                referencedTableName: 'questionnaireResponses',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'questionResponseAnswers',
            new TableForeignKey({
                columnNames: ['questionId'],
                referencedTableName: 'questions',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'questionResponseAnswers',
            new TableForeignKey({
                columnNames: ['optionId'],
                referencedTableName: 'questionOptions',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );

        await queryRunner.createIndex(
            'questionResponseAnswers',
            new TableIndex({
                columnNames: ['responseId'],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
