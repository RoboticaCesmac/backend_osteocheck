"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnDeactivatedOnProfessionalsTable1778418684444 = void 0;
class AddColumnDeactivatedOnProfessionalsTable1778418684444 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "professionals" ADD "deactivated" boolean DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "professionals" DROP COLUMN "deactivated"`);
    }
}
exports.AddColumnDeactivatedOnProfessionalsTable1778418684444 = AddColumnDeactivatedOnProfessionalsTable1778418684444;
