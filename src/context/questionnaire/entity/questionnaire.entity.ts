import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { QuestionGroup } from './questionGroup.entity';
import { QuestionnaireResponse } from './questionnaireResponse.entity';
import { QuestionnaireType } from '../enum/questionnaireType.enum';

@Entity('questionnaires')
export class Questionnaire {
  @PrimaryGeneratedColumn('identity')
  id!: number;

  @Column('varchar', { length: 255 })
  title!: string;

  @Column('text', { nullable: true })
  description!: string;

  @Column('boolean', { default: true })
  isActive!: boolean;

  @Column('boolean', { default: true })
  type!: QuestionnaireType;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relations
  @OneToMany(() => QuestionGroup, (group) => group.questionnaire, {
    cascade: true,
  })
  groups!: QuestionGroup[];

  @OneToMany(() => QuestionnaireResponse, (response) => response.questionnaire, {
    cascade: true,
  })
  responses!: QuestionnaireResponse[];
}