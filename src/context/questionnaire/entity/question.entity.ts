import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { QuestionType } from '../enum/questionType.enum';
import { QuestionGroup } from './questionGroup.entity';
import { QuestionOption } from './questionOption.entity';
import { QuestionResponseAnswer } from './questionnaireResponseAnswer.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('identity')
  id!: number;

  @Column('int')
  groupId!: string;

  @Column('text')
  text!: string;

  @Column('enum', { enum: QuestionType, default: QuestionType.SINGLE_CHOICE })
  type!: QuestionType;

  @Column('int', { comment: 'Order of question within group' })
  order!: number;

  @Column('boolean', { default: true })
  isRequired!: boolean;

  @Column('text', { nullable: true, comment: 'Additional guidance for the question' })
  helpText!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relations
  @ManyToOne(() => QuestionGroup, (group) => group.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'groupId' })
  group!: QuestionGroup;

  @OneToMany(() => QuestionOption, (option) => option.question, {
    cascade: true,
  })
  options!: QuestionOption[];

  @OneToMany(() => QuestionResponseAnswer, (answer) => answer.question)
  answers!: QuestionResponseAnswer[];
}