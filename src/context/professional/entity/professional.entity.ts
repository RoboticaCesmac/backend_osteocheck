import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { ProfessionalPatients } from '../../professionalPatients/entity/professionalPatients.entity'
import { Patient } from "../../patients/entity/patients.entity";

@Entity({
  name: "professionals",
})
export class Professional {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  accountConfirmationToken!: string;

  @Column()
  forgotPasswordToken?: string;

  @Column()
  hasConfirmedAccount!: boolean;

  @OneToMany(
    () => ProfessionalPatients,
    (pp) => pp.professional 
  )
  patientRelations!: ProfessionalPatients[];

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}