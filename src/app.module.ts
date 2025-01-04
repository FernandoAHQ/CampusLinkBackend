import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'typeorm';
import { Kiosk } from './typeorm/entities/Kiosk';
import { Student } from './typeorm/entities/Student';
import { Section } from './typeorm/entities/Section';
import { Attendance } from './typeorm/entities/Attendance';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'campus_link',
      entities: [Admin, Kiosk, Student, Section, Attendance],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
