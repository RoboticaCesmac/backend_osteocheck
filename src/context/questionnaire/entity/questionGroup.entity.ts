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
import { Questionnaire } from './questionnaire.entity';
import { Question } from './question.entity';

@Entity('questionGroups')
export class QuestionGroup {
  @PrimaryGeneratedColumn('identity')
  id!: string;

  @Column('int')
  questionnaireId!: string;

  @Column('varchar', { length: 255 })
  name!: string;

  @Column('text', { nullable: true })
  description!: string;

  @Column('int', { comment: 'Order of group within questionnaire' })
  order!: number;

  @Column('boolean', { default: false, comment: 'Whether this is the starting group' })
  isInitial!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relations
  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.groups, {
    onDelete: 'CASCADE',
  })

  @JoinColumn({ name: 'questionnaireId' })
  questionnaire!: Questionnaire;

  @OneToMany(() => Question, (question) => question.group, { cascade: true })
  questions!: Question[];
}