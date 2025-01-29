import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('articles')
  export class Article {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255 })
    title: string;
  
    @Column({ type: 'text' })
    content: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
  
    @Column({ type: 'simple-array', nullable: true })
    tags: string[];
  
    @Column({ type: 'boolean', default: true })
    active: boolean;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    image_url: string;
  }
  