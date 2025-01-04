import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string; // Make sure to hash this before storing it.

  @Column({
    type: 'enum',
    enum: ['superadmin', 'admin'],
    default: 'admin',
  })
  role;

  @CreateDateColumn({ type: 'timestamp' })
  created_at;
}
