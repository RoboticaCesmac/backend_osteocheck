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
                - **Condutas Recomendadas:**
                - Educação do paciente sobre higiene oral rigorosa.
                - Controle de fatores de risco modificáveis (higiene oral, tabagismo, diabetes).
                - Acompanhamento clínico regular e frequente por cirurgião-dentista.
                - Tratamento sintomático com analgésicos, quando necessário.
                - Uso de antissépticos bucais (clorexidina 0,12%) em bochechos 2x/dia.
                - Antibioticoterapia em casos com sinais de infecção secundária:
                  - Amoxicilina – primeira escolha em casos leves/moderados (500 mg, 8/8 h por 7–14 dias).
                  - Amoxicilina + Clavulanato – indicada em casos com supuração importante, infecção odontogênica associada ou suspeita de anaeróbios (875/125 mg, 12/12 h).
                  - Amoxicilina + Metronidazol – opção para maior cobertura contra anaeróbios (Amoxicilina 500 mg + Metronidazol 400–500 mg, ambos 8/8 h).
                  - Clindamicina – alternativa para pacientes alérgicos à penicilina (300 mg, 6/6 h ou 8/8 h); utilizar com cautela devido ao risco de colite por Clostridioides difficile.
                  - Azitromicina – alternativa em casos leves ou intolerância a outros antibióticos (500 mg/dia por 3–5 dias).
                - Solicitação de exames de imagem (preferencialmente Tomografia Computadorizada de Feixe Cônico) para investigação complementar e avaliação diagnóstica.
                - Evitar procedimentos odontológicos invasivos sempre que possível.
                - **Encaminhamento Sugerido:** Cirurgião Bucomaxilofacial para avaliação especializada.
            `,
                type: questionnaireResultType_enum_1.QuestionnaireResultType.OnmRmSuspectionOnStageZero,
            },
            {
                content: `
            - **Estágio 2:**
                - **Condutas Recomendadas:**
                - Enxágues bucais com antissépticos (ex.: clorexidina 0,12%) em bochechos 2x/dia.
                - Educação do paciente sobre higiene oral rigorosa.
                - Controle dos fatores de risco modificáveis.
                - Antibioticoterapia conforme quadro infeccioso:
                  - Amoxicilina – primeira escolha em infecções leves/moderadas (500 mg, 8/8 h por 7–14 dias).
                  - Amoxicilina + Clavulanato – indicada em casos com supuração importante, celulite ou maior suspeita de anaeróbios (875/125 mg, 12/12 h).
                  - Amoxicilina + Metronidazol – opção para ampliar cobertura contra anaeróbios (Amoxicilina 500 mg + Metronidazol 400–500 mg, ambos 8/8 h).
                  - Clindamicina – alternativa para pacientes alérgicos à penicilina (300 mg, 6/6 h ou 8/8 h); utilizar com cautela devido ao risco de colite por Clostridioides difficile.
                  - Azitromicina – alternativa em casos leves ou intolerância a outros antibióticos (500 mg/dia por 3–5 dias).
                - Controle da dor com analgésicos.
                - Acompanhamento clínico regular e frequente por cirurgião-dentista.
                - Desbridamento superficial/sequestrectomia para remoção de espículas ósseas ou sequestros móveis sintomáticos.
                - Considerar abordagem cirúrgica em casos persistentes, refratários ou com progressão clínica.
            `,
                type: questionnaireResultType_enum_1.QuestionnaireResultType.OnmRmEstablished,
            },
            {
                content: `
            - **Paciente com risco insignificante para ONM-RM** 
            - **Encaminhar para avaliação odontológica antes de iniciar o uso de medicamentos antirreabsortivos/antiangiogênicos.**
            `,
                type: questionnaireResultType_enum_1.QuestionnaireResultType.OnmRmInsignificantRisk,
            },
            {
                content: `
            - **Estágio 1:**
                - **Condutas Recomendadas:**
                - Enxágues bucais com antissépticos (ex.: clorexidina 0,12%) em bochechos 2x/dia.
                - Educação do paciente sobre higiene oral rigorosa.
                - Controle de fatores de risco modificáveis (higiene oral, tabagismo, diabetes).
                - Acompanhamento clínico regular e frequente por cirurgião-dentista.
                - Controle local para prevenção de trauma e infecção secundária.
                - Procedimentos cirúrgicos conservadores podem ser considerados em casos selecionados, especialmente para remoção de espículas ósseas ou áreas sintomáticas de osso necrótico.
            `,
                type: questionnaireResultType_enum_1.QuestionnaireResultType.StageOne,
            },
            {
                content: `
            - **Estágio 2:**
                - **Condutas Recomendadas:**
                - Enxágues bucais com antissépticos (ex.: clorexidina 0,12%) em bochechos 2x/dia.
                - Educação do paciente sobre higiene oral rigorosa.
                - Controle dos fatores de risco modificáveis.
                - Antibioticoterapia conforme quadro infeccioso:
                  - Amoxicilina – primeira escolha em infecções leves/moderadas (500 mg, 8/8 h por 7–14 dias).
                  - Amoxicilina + Clavulanato – indicada em casos com supuração importante, celulite ou maior suspeita de anaeróbios (875/125 mg, 12/12 h).
                  - Amoxicilina + Metronidazol – opção para ampliar cobertura contra anaeróbios (Amoxicilina 500 mg + Metronidazol 400–500 mg, ambos 8/8 h).
                  - Clindamicina – alternativa para pacientes alérgicos à penicilina (300 mg, 6/6 h ou 8/8 h); utilizar com cautela devido ao risco de colite por Clostridioides difficile.
                  - Azitromicina – alternativa em casos leves ou intolerância a outros antibióticos (500 mg/dia por 3–5 dias).
                - Controle da dor com analgésicos.
                - Acompanhamento clínico regular e frequente por cirurgião-dentista.
                - Desbridamento superficial/sequestrectomia para remoção de espículas ósseas ou sequestros móveis sintomáticos.
                - Considerar abordagem cirúrgica em casos persistentes, refratários ou com progressão clínica.
            `,
                type: questionnaireResultType_enum_1.QuestionnaireResultType.StageTwo,
            },
            {
                content: `
            - **Estágio 3:**
                - **Condutas Recomendadas:**
                - Educação do paciente sobre higiene oral rigorosa.
                - Controle dos fatores de risco modificáveis.
                - Enxágues bucais com antissépticos (ex.: clorexidina 0,12%) em bochechos 2x/dia.
                - Antibioticoterapia sistêmica conforme quadro infeccioso:
                  - Amoxicilina + Clavulanato – opção frequente em infecções moderadas/graves, com supuração ou envolvimento de anaeróbios (875/125 mg, 12/12 h).
                  - Amoxicilina + Metronidazol – utilizada para ampliar cobertura contra anaeróbios (Amoxicilina 500 mg + Metronidazol 400–500 mg, ambos 8/8 h).
                  - Clindamicina – alternativa para pacientes alérgicos à penicilina (300 mg, 6/6 h ou 8/8 h); usar com cautela devido ao risco de colite por Clostridioides difficile.
                  - Azitromicina – alternativa em casos leves/intolerância medicamentosa (500 mg/dia por 3–5 dias).
                  - Em casos graves/com comprometimento sistêmico e necessidade de internação hospitalar: Ampicilina + Sulbactam 1,5–3 g IV a cada 6 horas; Piperacilina + Tazobactam 4,5 g IV a cada 6–8 horas; Ceftriaxona 1–2 g IV/dia + Metronidazol 500 mg IV 8/8 h. Alérgicos à penicilina: Clindamicina 600–900 mg IV a cada 8 horas.
                - Controle da dor com analgésicos.
                - Encaminhar para o cirurgião bucomaxilofacial.
                - Intervenção cirúrgica com ressecção do osso necrótico ou desbridamento mais extenso. Pode requerer reconstrução e reabilitação funcional.
                - Considerar cirurgia agressiva em casos refratários. Abordagem multidisciplinar.
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
