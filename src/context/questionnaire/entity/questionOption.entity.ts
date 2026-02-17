import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { QuestionResponseAnswer } from './questionnaireResponseAnswer.entity';

@Entity('questionOptions')
export class QuestionOption {
  @PrimaryGeneratedColumn('identity')
  id!: number;

  @Column('int')
  questionId!: number;

  @Column('varchar', { length: 255 })
  text!: string;

  @Column('varchar', { length: 255, comment: 'Unique value for this option' })
  value!: string;

  @Column('int', { comment: 'Order of option within question' })
  order!: number;

  @Column('boolean', { nullable: false, default: false })
  isTerminal!: boolean;

  @Column('int', {
    nullable: true,
    comment: 'Jump to this question if option selected (branching logic)',
  })
  nextQuestionId!: number | null;

  @CreateDateColumn()
  createdAt!: Date;

  // Relations
  @ManyToOne(() => Question, (question) => question.options, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'questionId' })
  question!: Question;

  @ManyToOne(() => Question, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'nextQuestionId' })
  nextQuestion!: Question | null;

  @OneToMany(() => QuestionResponseAnswer, (answer) => answer.option)
  answers!: QuestionResponseAnswer[];
}