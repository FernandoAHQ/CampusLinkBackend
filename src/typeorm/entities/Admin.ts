import { AdminRole } from 'src/admins/dtos/createAdmin.dto';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Timestamp,
} from 'typeorm';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string; // Make sure to hash this before storing it.

  @Column({
    type: 'enum',
    enum: ['superadmin', 'admin'],
    default: 'admin',
  })
  role: AdminRole;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Timestamp;
}
