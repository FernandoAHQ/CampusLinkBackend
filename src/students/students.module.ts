import { Module } from '@nestjs/common';
import { StudentsController } from './controllers/students/students.controller';
import { StudentsService } from './services/students/students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/typeorm/entities/Student';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
