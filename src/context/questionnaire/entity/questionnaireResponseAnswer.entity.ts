import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QuestionnaireResponse } from './questionnaireResponse.entity';
import { Question } from './question.entity';
import { QuestionOption } from './questionOption.entity';

@Entity('questionResponseAnswers')
export class QuestionResponseAnswer {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column('int')
  responseId!: number;

  @Column('int')
  questionId!: number;

  @Column('int', { nullable: true, comment: 'For choice-based answers' })
  optionId!: number | null;

  @Column('text', { nullable: true, comment: 'For text/number/date answers' })
  textAnswer!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relations
  @ManyToOne(() => QuestionnaireResponse, (response) => response.answers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'responseId' })
  response!: QuestionnaireResponse;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'questionId' })
  question!: Question;

  @ManyToOne(() => QuestionOption, (option) => option.answers, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'optionId' })
  option!: QuestionOption | null;
}