import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserParams } from 'src/students/utils/types';
import { Student } from 'src/typeorm/entities/Student';
import { hassPassword } from 'src/utils/security';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async findStudents() {
    try {
      const students = await this.studentRepository
        .createQueryBuilder('student')
        .leftJoinAndSelect('student.section', 'section')
        .select([
          'student.id',
          'student.name',
          'student.email',
          'section.name AS major', // Only selecting the section name, not the entire object
        ])
        .getRawMany();
      // .select([
      //   'student.id',
      //   'student.name',
      //   'student.email',
      //   'section.name', // Only selecting the section name, not the entire object
      // ])
      // .getMany();

      return {
        status: 'success',
        message: 'Students fetched.',
        data: students,
      };
    } catch (error) {
      console.log(error.message);
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  async createStudent(createUserParams: CreateUserParams) {
    const password = await hassPassword(createUserParams.password);
    try {
      const newUser = this.studentRepository.create({
        ...createUserParams,
        password,
      });
      this.studentRepository.save(newUser);
      return {
        status: 'success',
        message: 'Student created successfully.',
        data: newUser,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
        message: error.message,
      };
    }
  }
}
