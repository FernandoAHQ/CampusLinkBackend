import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  Timestamp,
} from 'typeorm';
import { Attendance } from './Attendance';

@Entity('kiosks')
export class Kiosk {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Timestamp;

  @OneToMany(() => Attendance, (attendance) => attendance.kiosk)
  attendances: Attendance;
}
