import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateStudentDto } from 'src/students/dtos/CreateStudent.dto';
import { StudentsService } from 'src/students/services/students/students.service';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get('all')
  getStudents() {
    return this.studentsService.findStudents();
  }

  @Post('create')
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.createStudent(createStudentDto);
  }
}
