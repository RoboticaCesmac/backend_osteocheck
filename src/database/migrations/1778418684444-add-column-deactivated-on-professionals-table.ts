import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnDeactivatedOnProfessionalsTable1778418684444 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "professionals" ADD "deactivated" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "professionals" DROP COLUMN "deactivated"`);
    }

}
