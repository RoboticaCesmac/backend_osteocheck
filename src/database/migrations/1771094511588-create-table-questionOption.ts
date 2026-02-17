import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableQuestionOption1771094511588 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'questionOptions',
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: 'questionId',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'text',
                        type: 'text',
                        isNullable: false,
                    },
                    {
                        name: 'value',
                        type: 'varchar',
                        isNullable: false,
                        comment: 'Unique value for this option',
                    },
                    {
                        name: 'order',
                        type: 'int',
                        isNullable: false,
                        comment: 'Order of option within question',
                    },
                    {
                        name: 'nextQuestionId',
                        type: 'int',
                        isNullable: true,
                        comment: 'Jump to this question if option selected (branching logic)',
                    },
                    {
                        name: 'isTerminal',
                        type: 'boolean',
                        isNullable: false,
                        default: false,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            'questionOptions',
            new TableForeignKey({
                columnNames: ['questionId'],
                referencedTableName: 'questions',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'questionOptions',
            new TableForeignKey({
                columnNames: ['nextQuestionId'],
                referencedTableName: 'questions',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
