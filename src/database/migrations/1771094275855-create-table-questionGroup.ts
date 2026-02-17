import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateTableQuestionGroup1771094275855 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'questionGroups',
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
                        name: 'name',
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
                        name: 'order',
                        type: 'int',
                        isNullable: false,
                        comment: 'Order of group within questionnaire',
                    },
                    {
                        name: 'isInitial',
                        type: 'boolean',
                        default: false,
                        comment: 'Whether this is the starting group',
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
            'questionGroups',
            new TableForeignKey({
                columnNames: ['questionnaireId'],
                referencedTableName: 'questionnaires',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createIndex(
            'questionGroups',
            new TableIndex({
                columnNames: ['questionnaireId', 'order'],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
