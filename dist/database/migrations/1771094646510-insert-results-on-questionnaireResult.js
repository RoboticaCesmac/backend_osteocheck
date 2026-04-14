"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertResultsOnQuestionnaireResult1771094646510 = void 0;
const questionnaireResultType_enum_1 = require("../../context/questionnaire/enum/questionnaireResultType.enum");
class InsertResultsOnQuestionnaireResult1771094646510 {
    async up(queryRunner) {
        const resultTexts = [{
                content: `
                - **Paciente em Risco para ONM-RM.**
                    - **Conduta Recomendada:**
                    - Educação do paciente sobre higiene oral e sinais de alerta.
                    - Avaliação odontológica preventiva e estabilização do meio bucal.
                    - Acompanhamento clínico regular.
                    - **Encaminhamento Sugerido:** Cirurgião-dentista para planejamento preventivo.
            `,
                type: questionnaireResultType_enum_1.QuestionnaireResultType.OnmRmRisk,
            },
            {
                content: `
            - **Suspeita de ONM-RM - Estágio 0:**
                - **Conduta Recomendada:**
                - Educação do paciente sobre higiene oral.
                - Acompanhamento clínico regular.
                - Tratamento sintomático (analgésicos).
                - Antibioticoterapia se houver sinais de infecção.
                - Solicitação de exames de imagem (Tomografia Computadorizada de Feixe Cônico ou Ressonância Magnética) para confirmação.
                - **Encaminhamento Sugerido:** Cirurgião Bucomaxilofacial.
            `,
                type: questionnaireResultType_enum_1.QuestionnaireResultType.OnmRmSuspectionOnStageZero,
            },
            {
                content: `
            - **Estágio 2:**
                - **Conduta:** Conservadora + Medicação Sistêmica.
                - **Ações:**
                  - Enxágues com antissépticos.
                  - Antibioticoterapia oral (baseada no quadro infeccioso).
                  - Controle da dor com analgésicos.
                  - Desbridamento superficial para remoção de fragmentos soltos.
                - Se os sintomas persistirem, considerar cirurgia.
            `,
                type: questionnaireResultType_enum_1.QuestionnaireResultType.OnmRmEstablished,
            },
            {
                content: `
            - **Paciente com risco insignificante para ONM-RM relacionada a estes medicamentos.** 
            `,
                type: questionnaireResultType_enum_1.QuestionnaireResultType.OnmRmInsignificantRisk,
            },
            {
                content: `
            - **Estágio 1:**
                - **Conduta:** Conservadora.
                - **Ações:**
                  - Enxágues com antissépticos (Clorexidina 0,12%).
                  - Acompanhamento clínico.
                  - Educação do paciente.
                - A cirurgia pode ser considerada em casos selecionados para remoção de pequenas exposições irritativas.
            `,
                type: questionnaireResultType_enum_1.QuestionnaireResultType.StageOne,
            },
            {
                content: `
            - **Estágio 2:**
                - **Conduta:** Conservadora + Medicação Sistêmica.
                - **Ações:**
                  - Enxágues com antissépticos.
                  - Antibioticoterapia oral (baseada no quadro infeccioso).
                  - Controle da dor com analgésicos.
                  - Desbridamento superficial para remoção de fragmentos soltos.
                - Se os sintomas persistirem, considerar cirurgia.
            `,
                type: questionnaireResultType_enum_1.QuestionnaireResultType.StageTwo,
            },
            {
                content: `
            - **Estágio 3:**
                - **Conduta:** Cirúrgica.
                - **Ações:**
                  - Antibioticoterapia.
                  - Enxágues com antisséptico.
                  - Desbridamento cirúrgico extenso / ressecção do osso necrótico.
                  - Pode requerer reconstrução e reabilitação funcional.
                - **Encaminhamento Obrigatório:** Cirurgião Bucomaxilofacial.
            `,
                type: questionnaireResultType_enum_1.QuestionnaireResultType.StageThree,
            },
        ];
        resultTexts.forEach(async (element) => {
            await queryRunner.query(`
                    INSERT INTO "questionnaireResults" (text, type, "createdAt", "updatedAt")
                    VALUES (
                        $1,
                        $2,
                        NOW(),
                        NOW()
                    )
                    `, [element.content.trim(), element.type]);
        });
    }
    async down(queryRunner) {
        await queryRunner.dropTable('questionnaireResults');
    }
}
exports.InsertResultsOnQuestionnaireResult1771094646510 = InsertResultsOnQuestionnaireResult1771094646510;
