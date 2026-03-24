import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateQuestionnaire1771110237354 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('🔍 Starting OsteoCheck Questionnaire Seeding...');

    // ================================================================
    // STEP 1: Insert Questionnaire (auto-generated ID)
    // ================================================================
    const questionnaireResult = await queryRunner.query(`
      INSERT INTO questionnaires (title, description, "isActive", type, "createdAt", "updatedAt")
      VALUES (
        'OsteoCheck - Avaliação de Osteonecrose dos Maxilares',
        'Ferramenta clínica de apoio à decisão para estimação de risco, estadiamento e conduta quando há suspeita ou diagnóstico de osteonecrose dos maxilares relacionada a medicamentos. Segue critérios da AAOMS (2022) e consenso MASCC/ISOO/ASCO (2019).',
        true,
        'jawAssessment',
        NOW(),
        NOW()
      )
      RETURNING id;
    `);
    const questionnaireId = questionnaireResult[0].id;
    console.log(`✅ Questionnaire created with ID: ${questionnaireId}`);

    // ================================================================
    // STEP 2: Insert Question Groups (A-G) with auto-generated IDs
    // ================================================================
    const groups: Record<string, number> = {};
    const groupData = [
      {
        key: 'GROUP_A',
        name: 'Group A - Triagem de Risco Inicial',
        description: 'Avaliação inicial do uso de medicações antirreabsortivas e antiangiogênicas',
        order: 0,
        isInitial: true,
      },
      {
        key: 'GROUP_B',
        name: 'Group B - Detalhes da Medicação',
        description: 'Especificar o tipo, indicação clínica e duração da medicação',
        order: 1,
        isInitial: false,
      },
      {
        key: 'GROUP_C',
        name: 'Group C - Fatores de Risco Adicionais',
        description: 'Avaliar comorbidades e outros fatores de risco para ONM-RM',
        order: 2,
        isInitial: false,
      },
      {
        key: 'GROUP_D',
        name: 'Group D - Avaliação de Exposição Óssea',
        description: 'Investigar sinais clínicos evidentes de exposição óssea persistente',
        order: 3,
        isInitial: false,
      },
      {
        key: 'GROUP_E',
        name: 'Group E - Sinais e Sintomas de Alerta do Estágio 0',
        description: 'Identificar sinais precoces de possível ONM-RM sem exposição óssea evidente',
        order: 4,
        isInitial: false,
      },
      {
        key: 'GROUP_F',
        name: 'Group F - Critérios Diagnósticos',
        description: 'Confirmar a presença de critérios diagnósticos estabelecidos para ONM-RM',
        order: 5,
        isInitial: false,
      },
      {
        key: 'GROUP_G',
        name: 'Group G - Classificação do Estágio',
        description: 'Definir o estágio clínico da ONM-RM para determinar conduta terapêutica',
        order: 6,
        isInitial: false,
      },
      {
        key: 'GROUP_H',
        name: 'Group H - Sintomas de alerta do estágio 0',
        description: 'Sintomas de alerta do estágio 0',
        order: 7,
        isInitial: false,
      },
    ];

    for (const group of groupData) {
      const result = await queryRunner.query(`
        INSERT INTO "questionGroups" ("questionnaireId", name, description, "order", "isInitial", "createdAt", "updatedAt")
        VALUES (
          ${questionnaireId},
          '${group.name}',
          '${group.description}',
          ${group.order},
          ${group.isInitial},
          NOW(),
          NOW()
        )
        RETURNING id;
      `);
      groups[group.key] = result[0].id;
      console.log(`✅ Group created: ${group.name} (ID: ${result[0].id})`);
    }

    // ================================================================
    // STEP 3: Insert Questions and Options with auto-generated IDs
    // ================================================================

    // ============================================================
    // Q1: MEDICATION USE SCREENING (Group A)
    // ============================================================
    const q1Result = await queryRunner.query(`
      INSERT INTO questions ("groupId", text, type, "order", "isRequired", "helpText", "createdAt", "updatedAt")
      VALUES (
        ${groups.GROUP_A},
        'O paciente faz ou fez uso de Drogas Antirreabsortivas (Bisfosfonatos ou Denosumabe) e/ou Drogas Antiangiogênicas?',
        'singleChoice',
        0,
        true,
        'Estas drogas incluem bisfosfonatos (orais ou intravenosos), denosumabe e agentes antiangiogênicos',
        NOW(),
        NOW()
      )
      RETURNING id;
    `);
    const q1Id = q1Result[0].id;
    console.log(`✅ Question Q1 created (ID: ${q1Id})`);

    // Q1 Options
    const q1YesResult = await queryRunner.query(`
      INSERT INTO "questionOptions" ("questionId", text, value, "order", "createdAt")
      VALUES (${q1Id}, 'Sim', 'yes_medication', 0, NOW())
      RETURNING id;
    `);
    const q1YesId = q1YesResult[0].id;

    const q1NoResult = await queryRunner.query(`
      INSERT INTO "questionOptions" ("questionId", text, value, "order", "createdAt", "isTerminal")
      VALUES (${q1Id}, 'Não', 'no_medication', 1, NOW(), true)
      RETURNING id;
    `);
    const q1NoId = q1NoResult[0].id;

    // ============================================================
    // Q2: MEDICATION DETAILS (Group B - 3 sub-questions)
    // ============================================================

    // Q2a: Type of Medication
    const q2aResult = await queryRunner.query(`
      INSERT INTO questions ("groupId", text, type, "order", "isRequired", "createdAt", "updatedAt")
      VALUES (
        ${groups.GROUP_B},
        'Qual é o tipo de medicamento?',
        'singleChoice',
        0,
        true,
        NOW(),
        NOW()
      )
      RETURNING id;
    `);
    const q2aId = q2aResult[0].id;

    await queryRunner.query(`
      INSERT INTO "questionOptions" ("questionId", text, value, "order", "createdAt")
      VALUES
        (${q2aId}, 'Bisfosfonato Oral', 'bisphosphonate_oral', 0, NOW()),
        (${q2aId}, 'Bisfosfonato Intravenoso', 'bisphosphonate_iv', 1, NOW()),
        (${q2aId}, 'Denosumabe', 'denosumabe', 2, NOW()),
        (${q2aId}, 'Antiangiogênico', 'antiangiogenic', 3, NOW());
    `);

    // Update Q1 "Yes" option to branch to Q2a
    await queryRunner.query(`
      UPDATE "questionOptions"
      SET "nextQuestionId" = ${q2aId}
      WHERE id = ${q1YesId};
    `);

    console.log(`✅ Question Q2a (Medication Type) created (ID: ${q2aId})`);

    // Q2b: Clinical Indication
    const q2bResult = await queryRunner.query(`
      INSERT INTO questions ("groupId", text, type, "order", "isRequired", "createdAt", "updatedAt")
      VALUES (
        ${groups.GROUP_B},
        'Qual é a indicação clínica?',
        'singleChoice',
        1,
        true,
        NOW(),
        NOW()
      )
      RETURNING id;
    `);
    const q2bId = q2bResult[0].id;

    await queryRunner.query(`
      INSERT INTO "questionOptions" ("questionId", text, value, "order", "createdAt")
      VALUES
        (${q2bId}, 'Osteoporose', 'osteoporosis', 0, NOW()),
        (${q2bId}, 'Doença Oncológica (metástases ósseas, mieloma múltiplo)', 'oncologic_disease', 1, NOW()),
        (${q2bId}, 'Outra', 'other_indication', 2, NOW());
    `);

    console.log(`✅ Question Q2b (Clinical Indication) created (ID: ${q2bId})`);

    // Q2c: Duration of Use
    const q2cResult = await queryRunner.query(`
      INSERT INTO questions ("groupId", text, type, "order", "isRequired", "createdAt", "updatedAt")
      VALUES (
        ${groups.GROUP_B},
        'Qual é o tempo de uso da medicação?',
        'singleChoice',
        2,
        true,
        NOW(),
        NOW()
      )
      RETURNING id;
    `);
    const q2cId = q2cResult[0].id;

    await queryRunner.query(`
      INSERT INTO "questionOptions" ("questionId", text, value, "order", "createdAt")
      VALUES
        (${q2cId}, '< 1 ano', 'less_than_1_year', 0, NOW()),
        (${q2cId}, '1-3 anos', '1_to_3_years', 1, NOW()),
        (${q2cId}, '> 3 anos', 'more_than_3_years', 2, NOW());
    `);

    console.log(`✅ Question Q2c (Duration of Use) created (ID: ${q2cId})`);

    // ============================================================
    // Q3: ADDITIONAL RISK FACTORS (Group C)
    // ============================================================
    const q3Result = await queryRunner.query(`
      INSERT INTO questions ("groupId", text, type, "order", "isRequired", "helpText", "createdAt", "updatedAt")
      VALUES (
        ${groups.GROUP_C},
        'Quais dos seguintes fatores de risco adicionais o paciente apresenta?',
        'multipleChoice',
        0,
        false,
        'Selecione todos os que se aplicam',
        NOW(),
        NOW()
      )
      RETURNING id;
    `);
    const q3Id = q3Result[0].id;

    const riskFactors = [
      { text: 'Idade avançada', value: 'advanced_age' },
      { text: 'Sexo feminino', value: 'female_sex' },
      { text: 'Tabagismo', value: 'smoking' },
      { text: 'Diabetes', value: 'diabetes' },
      { text: 'Artrite Reumatóide', value: 'rheumatoid_arthritis' },
      { text: 'Má higiene oral', value: 'poor_oral_hygiene' },
      { text: 'Uso de Corticosteroides Sistêmicos', value: 'systemic_corticosteroids' },
      { text: 'Uso de Quimioterápicos ou Imunossupressores', value: 'chemotherapy_immunosuppressants' },
      { text: 'Doença Periodontal', value: 'periodontal_disease' },
      { text: 'Uso de Prótese Mal Adaptada', value: 'ill_fitting_denture' },
      { text: 'História de Procedimentos Odontológicos Invasivos Recentes', value: 'recent_invasive_procedures' },
      { text: 'Xerostomia (induzida por medicamentos)', value: 'xerostomia' },
    ];

    for (let i = 0; i < riskFactors.length; i++) {
      const factor = riskFactors[i];
      await queryRunner.query(`
        INSERT INTO "questionOptions" ("questionId", text, value, "order", "createdAt")
        VALUES (${q3Id}, '${factor.text}', '${factor.value}', ${i}, NOW());
      `);
    }

    console.log(`✅ Question Q3 (Risk Factors) created with 12 options (ID: ${q3Id})`);

    // ============================================================
    // Q4: BONE EXPOSURE SCREENING (Group D)
    // ============================================================
    const q4Result = await queryRunner.query(`
      INSERT INTO questions ("groupId", text, type, "order", "isRequired", "helpText", "createdAt", "updatedAt")
      VALUES (
        ${groups.GROUP_D},
        'Há suspeita ou evidência de exposição óssea?',
        'singleChoice',
        0,
        true,
        'Investigação clínica visual de exposição óssea persistente',
        NOW(),
        NOW()
      )
      RETURNING id;
    `);
    const q4Id = q4Result[0].id;

    // Q5 will be created next (for the "No" branch)
    const q5Result = await queryRunner.query(`
      INSERT INTO questions ("groupId", text, type, "order", "isRequired", "helpText", "createdAt", "updatedAt")
      VALUES (
        ${groups.GROUP_E},
        'O paciente apresenta algum dos seguintes sinais e sintomas de alerta?',
        'multipleChoice',
        0,
        false,
        'Selecione todos os sinais/sintomas presentes. Se nenhum for selecionado, o paciente será classificado em Risco.',
        NOW(),
        NOW()
      )
      RETURNING id;
    `);
    const q5Id = q5Result[0].id;

    // Q6 will be created next (for the "Yes" branch)
    const q6Result = await queryRunner.query(`
      INSERT INTO questions ("groupId", text, type, "order", "isRequired", "helpText", "createdAt", "updatedAt")
      VALUES (
        ${groups.GROUP_F},
        'Confirme a presença dos seguintes critérios diagnósticos de ONM-RM:',
        'multipleChoice',
        0,
        true,
        'Todos os três critérios devem estar presentes para diagnóstico de ONM-RM estabelecida',
        NOW(),
        NOW()
      )
      RETURNING id;
    `);
    const q6Id = q6Result[0].id;

    // Q4 Options with branching
    const q4YesResult = await queryRunner.query(`
      INSERT INTO "questionOptions" ("questionId", text, value, "order", "isTerminal", "createdAt")
      VALUES (${q4Id}, 'Sim', 'yes_bone_exposure', 0, true, NOW())
      RETURNING id;
    `);

    const q4NoResult = await queryRunner.query(`
      INSERT INTO "questionOptions" ("questionId", text, value, "order", "nextQuestionId", "createdAt")
      VALUES (${q4Id}, 'Não', 'no_bone_exposure', 1, ${q6Id}, NOW())
      RETURNING id;
    `);

    console.log(`✅ Question Q4 (Bone Exposure) created with branching logic (ID: ${q4Id})`);

    // ============================================================
    // Q5: STAGE 0 WARNING SIGNS (Group E)
    // ============================================================
    const stage0Symptoms = [
      { text: 'Dor óssea inespecífica na maxila/mandíbula', value: 'nonspecific_bone_pain' },
      { text: 'Parestesia ou anestesia (ex.: "queixo dormente")', value: 'paresthesia_anesthesia' },
      { text: 'Mobilidade dentária inexplicada', value: 'unexplained_tooth_mobility' },
      { text: 'Falha de cicatrização de alvéolo pós-extração', value: 'socket_healing_failure' },
      { text: 'Infecção local recorrente, supuração leve e sensibilidade gengival', value: 'recurrent_infection' },
      { text: 'Edema ou ulceração na mucosa persistente sem causa clara', value: 'mucosal_edema_ulceration' },
      { text: 'Supuração ou fístula sem exposição óssea visível', value: 'suppuration_fistula' },
      { text: 'Sinusite persistente ou atípica com envolvimento do seio maxilar', value: 'persistent_sinusitis' },
      { text: 'Alterações Radiológicas Sugestivas (esclerose, espessamento do ligamento periodontal, radiolucências difusas)', value: 'radiological_alterations' },
    ];

    for (let i = 0; i < stage0Symptoms.length; i++) {
      const symptom = stage0Symptoms[i];
      await queryRunner.query(`
        INSERT INTO "questionOptions" ("questionId", text, value, "order", "createdAt", "isTerminal")
        VALUES (${q5Id}, '${symptom.text}', '${symptom.value}', ${i}, NOW(), true);
      `);
    }

    console.log(`✅ Question Q5 (Stage 0 Symptoms) created with 9 options (ID: ${q5Id})`);

    // ============================================================
    // Q6: DIAGNOSTIC CRITERIA (Group F)
    // ============================================================
    const diagnosticCriteria = [
      { text: 'Uso de agente antirreabsortivo/antiangiogênico', value: 'antiresorptive_use' },
      { text: 'Exposição óssea persistente (>8 semanas) ou osso sondável via fístula', value: 'persistent_bone_exposure' },
      { text: 'Ausência de radioterapia na região maxilofacial', value: 'no_radiotherapy' },
    ];

    for (let i = 0; i < diagnosticCriteria.length; i++) {
      const criterion = diagnosticCriteria[i];
      await queryRunner.query(`
        INSERT INTO "questionOptions" ("questionId", text, value, "order", "createdAt")
        VALUES (${q6Id}, '${criterion.text}', '${criterion.value}', ${i}, NOW());
      `);
    }

    console.log(`✅ Question Q6 (Diagnostic Criteria) created with 3 options (ID: ${q6Id})`);

    // ============================================================
    // Q7: STAGE CLASSIFICATION (Group G)
    // ============================================================
    const q7Result = await queryRunner.query(`
      INSERT INTO questions ("groupId", text, type, "order", "isRequired", "helpText", "createdAt", "updatedAt")
      VALUES (
        ${groups.GROUP_G},
        'Qual opção dos achados clínicos melhor se encaixa ao seu paciente?',
        'singleChoice',
        0,
        true,
        'Selecione apenas uma opção que melhor descreve o estágio clínico',
        NOW(),
        NOW()
      )
      RETURNING id;
    `);
    const q7Id = q7Result[0].id;

    await queryRunner.query(`
      INSERT INTO "questionOptions" ("questionId", text, value, "order", "createdAt", "isTerminal")
      VALUES
        (${q7Id}, 'Estágio 1: Osso exposto ou fístula sondável em paciente assintomático, sem infecção.', 'stage_1', 0, NOW(), true),
        (${q7Id}, 'Estágio 2: Osso exposto ou fístula sondável com dor, eritema e/ou infecção secundária (supuração).', 'stage_2', 1, NOW(), true),
        (${q7Id}, 'Estágio 3: Osso exposto extenso com dor intensa, infecção e uma ou mais das seguintes complicações: (i) Fratura patológica, (ii) Fístula extraoral, (iii) Comunicação oroantral/oronasal, (iv) Osteólise estendendo-se à borda inferior da mandíbula ou assoalho do seio maxilar.', 'stage_3', 2, NOW(), true);
    `);

    // ============================================================
    // Q8: GROUP H QUESTION (Sintomas de alerta do estágio 0)
    // ============================================================
    const q8Result = await queryRunner.query(`
      INSERT INTO questions ("groupId", text, type, "order", "isRequired", "helpText", "createdAt", "updatedAt")
      VALUES (
        ${groups.GROUP_H},
        'Sinais e Sintomas de Alerta do Estágio 0',
        'multipleChoice',
        0,
        false,
        '',
        NOW(),
        NOW()
      )
      RETURNING id;
    `);
    const q8Id = q8Result[0].id;

    const groupHOptions = [
      { text: 'Dor óssea inespecífica na maxila/mandíbula', value: 'h_nonspecific_bone_pain' },
      { text: 'Parestesia ou anestesia (ex.: "queixo dormente")', value: 'h_paresthesia_anesthesia' },
      { text: 'Mobilidade dentária inexplicada', value: 'h_unexplained_tooth_mobility' },
      { text: 'Falha de cicatrização de alvéolo pós-extração', value: 'h_socket_healing_failure' },
      { text: 'Infecção local recorrente, supuração leve e sensibilidade gengival', value: 'h_recurrent_infection' },
      { text: 'Edema ou ulceração na mucosa persistente sem causa clara', value: 'h_mucosal_edema_ulceration' },
      { text: 'Supuração ou fístula sem exposição óssea visível', value: 'h_suppuration_fistula' },
      { text: 'Sinusite persistente ou atípica com envolvimento do seio maxilar', value: 'h_persistent_sinusitis' },
      { text: 'Alterações Radiológicas Sugestivas (esclerose, espessamento do ligamento periodontal, radiolucências difusas)', value: 'h_radiological_alterations' },
    ];

    for (let i = 0; i < groupHOptions.length; i++) {
      const option = groupHOptions[i];
      await queryRunner.query(`
        INSERT INTO "questionOptions" ("questionId", text, value, "order", "createdAt")
        VALUES (${q8Id}, '${option.text}', '${option.value}', ${i}, NOW());
      `);
    }

    console.log(`✅ Question Q8 (Group H) created with ${groupHOptions.length} options (ID: ${q8Id})`);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
