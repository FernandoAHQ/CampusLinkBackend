import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  OneToMany,
} from 'typeorm';
import { Section } from './Section';
import { Attendance } from './Attendance';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @ManyToOne(() => Section, (section) => section.students, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'section_id' })
  section: number;

  @OneToMany(() => Attendance, (attendance) => attendance.student)
  attendances;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Timestamp;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Timestamp;
}
