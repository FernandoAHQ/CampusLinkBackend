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

  @Column({
    type: 'varchar',
    length: 255,
    default: 'https://avatar.iran.liara.run/public',
  })
  profile_picture: string;

  @Column({ type: 'boolean', default: true })
  ACTIVE: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

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
