import { MigrationInterface, QueryRunner } from "typeorm";
import { QuestionnaireResultType } from "../../context/questionnaire/enum/questionnaireResultType.enum";

export class InsertResultsOnQuestionnaireResult1771094646510 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const resultTexts = [{
            content:
                `
                - **Paciente em Risco para ONM-RM.**
                    - **Conduta Recomendada:**
                    - Educação do paciente sobre higiene oral e sinais de alerta.
                    - Avaliação odontológica preventiva e estabilização do meio bucal.
                    - Acompanhamento clínico regular.
                    - **Encaminhamento Sugerido:** Cirurgião-dentista para planejamento preventivo.
            `,
            type: QuestionnaireResultType.OnmRmRisk,
        },
        {
            content:
                `
            - **Suspeita de ONM-RM - Estágio 0:**
                - **Conduta Recomendada:**
                - Educação do paciente sobre higiene oral.
                - Acompanhamento clínico regular.
                - Tratamento sintomático (analgésicos).
                - Antibioticoterapia se houver sinais de infecção.
                - Solicitação de exames de imagem (Tomografia Computadorizada de Feixe Cônico ou Ressonância Magnética) para confirmação.
                - **Encaminhamento Sugerido:** Cirurgião Bucomaxilofacial.
            `,
            type: QuestionnaireResultType.OnmRmSuspectionOnStageZero,
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
            type: QuestionnaireResultType.OnmRmEstablished,
        },
        {
            content: `
            - **Paciente com risco insignificante para ONM-RM relacionada a estes medicamentos.** 
            `,
            type: QuestionnaireResultType.OnmRmInsignificantRisk,
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
            type: QuestionnaireResultType.StageOne,
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
            type: QuestionnaireResultType.StageTwo,
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
            type: QuestionnaireResultType.StageThree,
        },
        ]

        resultTexts.forEach(
            async (element: { content: string, type: string }) => {
                await queryRunner.query(`
                    INSERT INTO "questionnaireResults" (text, type, "createdAt", "updatedAt")
                    VALUES (
                        $1,
                        $2,
                        NOW(),
                        NOW()
                    )
                    `,
                    [element.content.trim(), element.type]
                )
            }
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('questionnaireResults');
    }

}
