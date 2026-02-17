import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateTableQuestion1771094412188 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
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
            }),
            true,
        );

        await queryRunner.createForeignKey(
            'questions',
            new TableForeignKey({
                columnNames: ['groupId'],
                referencedTableName: 'questionGroups',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createIndex(
            'questions',
            new TableIndex({
                columnNames: ['groupId', 'order'],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
