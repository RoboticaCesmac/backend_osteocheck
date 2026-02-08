import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Professional } from "../../professional/entity/professional.entity";
import { Patient } from "../../patients/entity/patients.entity";

@Entity({
  name: "professionalPatients",
})
export class ProfessionalPatients {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'professionalId'
  })
  professionalId!: number;

  @Column({
    name: 'patientId'
  })
  patientId!: number;

  @ManyToOne(() => Professional, (professional) => professional.patientRelations)
  @JoinColumn({
    name: 'professionalId'
  })
  professional!: Professional;

  @JoinColumn({
    name: 'patientId'
  })
  @ManyToOne(() => Patient, (patient) => patient.professionalRelations)
  patient!: Patient;
}