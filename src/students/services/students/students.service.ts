import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserParams, EditUserParams } from 'src/students/utils/types';
import { Student } from 'src/typeorm/entities/Student';
import { hashPassword } from 'src/utils/security';
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
          'student.active',
          'student.profile_picture',
          'student.email',
          'section.name AS major', // Only selecting the section name, not the entire object
        ])
        .getRawMany();

      //console.log(students);

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

  async editStudent(editUserParams: EditUserParams) {
    console.log(
      editUserParams.password ? 'password exists' : 'password does not exist',
    );

    //const password = await hashPassword(editUserParams.password!);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...updates } = editUserParams;
    const userData: Partial<Student> = updates;
    if (editUserParams.password) {
      userData.password = await hashPassword(editUserParams.password);
    }
    try {
      const newUser = await this.studentRepository.update(
        { id: editUserParams.id },
        userData,
      );

      console.log(newUser);

      return {
        status: 'success',
        message: 'Student updated successfully.',
        data: newUser,
      };
    } catch (error) {
      let errorMessage = error.message;
      console.log(error.code);
      if (error.code === 'ER_DUP_ENTRY')
        errorMessage = 'This email is already registered for another user.';
      return {
        status: 'error',
        message: errorMessage,
      };
    }
  }

  async createStudent(createUserParams: CreateUserParams) {
    const password = await hashPassword(createUserParams.password);
    try {
      const newUser = this.studentRepository.create({
        ...createUserParams,
        password,
      });
      await this.studentRepository.save(newUser);
      return {
        status: 'success',
        message: 'Student created successfully.',
        data: newUser,
      };
    } catch (error) {
      let errorMessage = error.message;
      console.log(error.code);
      if (error.code === 'ER_DUP_ENTRY')
        errorMessage = 'This email is already registered for another user.';
      return {
        status: 'error',
        message: errorMessage,
      };
    }
  }
}
