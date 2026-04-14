"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableQuestionnaireResults1771094646509 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableQuestionnaireResults1771094646509 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'questionnaireResults',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: 'text',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'type',
                    type: 'enum',
                    enum: ['onm-rmRisk', 'onm-rmSuspectionOnStageZero', 'onm-rmEstablished', 'onm-rmInsignificantRisk', 'stageOne', 'stageTwo', 'stageThree'],
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
                {
                    name: 'deletedAt',
                    type: 'timestamp',
                    isNullable: true,
                }
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('questionnaireResults');
    }
}
exports.CreateTableQuestionnaireResults1771094646509 = CreateTableQuestionnaireResults1771094646509;
