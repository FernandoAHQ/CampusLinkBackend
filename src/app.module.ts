import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kiosk } from './typeorm/entities/Kiosk';
import { Student } from './typeorm/entities/Student';
import { Section } from './typeorm/entities/Section';
import { Attendance } from './typeorm/entities/Attendance';
import { Admin } from './typeorm/entities/Admin';
import { StudentsModule } from './students/students.module';
import { AdminsModule } from './admins/admins.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ArticlesModule } from './articles/articles.module';
import { Article } from './articles/entities/article.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'campus_link',
      entities: [Admin, Kiosk, Student, Section, Attendance, Article],
      synchronize: true,
    }),
    StudentsModule,
    AdminsModule,
    AuthenticationModule,
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
