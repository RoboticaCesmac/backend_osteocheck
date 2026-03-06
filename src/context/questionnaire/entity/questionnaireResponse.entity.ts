import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { ResponseStatus } from '../enum/responseStatus.enum';
import { Questionnaire } from './questionnaire.entity';
import { QuestionResponseAnswer } from './questionnaireResponseAnswer.entity';
import { QuestionnaireResult } from './questionnaireResult.entity';
import { Patient } from '../../patients/entity/patients.entity';

@Entity('questionnaireResponses')
export class QuestionnaireResponse {
  @PrimaryGeneratedColumn('identity')
  id!: number;

  @Column('int')
  questionnaireId!: number;

  @Column('int', { comment: 'Professional filling the questionnaire' })
  professionalId!: number;

  @Column('int', { comment: 'Patient the questionnaire is for' })
  patientId!: number;

  @Column('enum', { enum: ResponseStatus, default: ResponseStatus.IN_PROGRESS })
  status!: ResponseStatus;

  @Column('timestamp', { nullable: true })
  completedAt!: Date | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;


  // Relations
  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.responses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'questionnaireId' })
  questionnaire!: Questionnaire;

  @ManyToOne(() => Patient, (patient) => patient.questionnaireResponses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'patientId' })
  patient!: Patient;

  @OneToOne(() => QuestionnaireResult, (result) => result)
  @JoinColumn({ name: 'questionnaireResultId' })
  result!: QuestionnaireResult;

  @OneToMany(
    () => QuestionResponseAnswer,
    (answer) => answer.response,
    { cascade: true },
  )
  answers!: QuestionResponseAnswer[];
}