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

  findStudents() {}

  async createStudent(createUserParams: CreateUserParams) {
    const password = await hassPassword(createUserParams.password);
    try {
      const newUser = this.studentRepository.create({
        ...createUserParams,
        password,
      });
      this.studentRepository.save(newUser);
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
        message: error.message,
      };
    }

    return {
      status: 'success',
      message: 'Student created successfully.',
      data: createUserParams,
    };
  }
}
