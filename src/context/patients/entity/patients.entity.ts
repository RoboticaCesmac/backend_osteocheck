import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { PatientsGender } from "../enum/patientsGender.enum";
import { ProfessionalPatients } from "../../professionalPatients/entity/professionalPatients.entity";
import { QuestionnaireResponse } from "../../questionnaire/entity/questionnaireResponse.entity";

@Entity({
  name: "patients",
})
export class Patient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  cpf!: string;

  @Column()
  dateOfBirth!: Date;

  @Column()
  gender!: PatientsGender;

  @OneToMany(
    () => ProfessionalPatients,
    (pp) => pp.patient
  )
  professionalRelations!: ProfessionalPatients[];

  @OneToMany(
    () => QuestionnaireResponse,
    (qr) => qr.patient
  )
  questionnaireResponses!: QuestionnaireResponse[];

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}