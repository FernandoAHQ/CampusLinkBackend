import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Student } from './Student';
import { Kiosk } from './Kiosk';

@Entity('attendance')
export class Attendance {
  @PrimaryGeneratedColumn()
  id;

  @ManyToOne(() => Student, (student) => student.attendances)
  @JoinColumn({ name: 'student_id' })
  student;

  @ManyToOne(() => Kiosk, (kiosk) => kiosk.attendances)
  @JoinColumn({ name: 'kiosk_id' })
  kiosk;

  @CreateDateColumn({ type: 'timestamp' })
  attended_at;
}
