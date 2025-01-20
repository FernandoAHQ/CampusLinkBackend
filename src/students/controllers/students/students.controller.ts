import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateStudentDto } from 'src/students/dtos/CreateStudent.dto';
import { StudentsService } from 'src/students/services/students/students.service';
import { AuthGuard } from '../../../authentication/authentication.guard';
import { EditStudentDto } from 'src/students/dtos/EditStudent.dto';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @UseGuards(AuthGuard)
  @Get('all')
  getStudents() {
    return this.studentsService.findStudents();
  }

  @Post('create')
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.createStudent(createStudentDto);
  }

  @Post('edit')
  editStudent(@Body() editStudentDto: EditStudentDto) {
    return this.studentsService.editStudent(editStudentDto);
  }
}
