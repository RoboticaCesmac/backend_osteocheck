import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';
import { QuestionnaireResultType } from '../enum/questionnaireResultType.enum';
import { QuestionnaireResponse } from './questionnaireResponse.entity';

@Entity('questionnaireResults')
export class QuestionnaireResult {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column('text')
  text!: string;

  @OneToOne(() => QuestionnaireResponse, (response) => response.result)
  response!: QuestionnaireResponse;

  @Column({
    type: 'enum',
    enum: QuestionnaireResultType,
  })
  type!: QuestionnaireResultType;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt!: Date | null;
}