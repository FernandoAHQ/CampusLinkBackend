import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminLoginParams, StudentLoginParams } from '../utils/types';
import { FindOptionsWhere } from 'typeorm';
import { Admin } from 'src/typeorm/entities/Admin';
import { comparePassword } from 'src/utils/security';
import { JwtService } from '@nestjs/jwt';
import { Student } from 'src/typeorm/entities/Student';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    private jwtService: JwtService,
  ) {}

  async renewTokenAdmin(request: Request) {
    console.log('USER ID: ' + request['id']);
    const id = request['id'];
    try {
      const user = await this.adminRepository.findOne({
        where: { id } as FindOptionsWhere<Admin>, // Correct structure
      });

      if (!user)
        return {
          status: 'failed',
          message: 'Something went wrong.',
        };

      const accessToken = await this.jwtService.signAsync({
        id: user.id,
        username: user.username,
      });

      return {
        status: 'successful',
        user,
        accessToken,
      };
    } catch (error) {
      console.error(error);
    }
    return 'hi';
  }
  async adminLogin(adminLoginParams: AdminLoginParams) {
    const { username, password } = adminLoginParams;
    try {
      const user = await this.adminRepository.findOne({
        where: { username } as FindOptionsWhere<Admin>, // Correct structure
      });

      if (!user)
        return {
          status: 'failed',
          message: 'Incorrect login credentials.',
        };

      return this.getAdminLoginResponse(password, user);
    } catch (error) {
      console.error(error);
    }
  }


  async studentLogin(studentLoginParams: StudentLoginParams) {
    const { email, password } = studentLoginParams;
    try {
      const user = await this.studentRepository.findOne({
        where: { email } as FindOptionsWhere<Student>, 
      });

      if (!user)
        return {
          status: 'failed',
          message: 'Incorrect login credentials.',
        };

      return this.getStudentLoginResponse(password, user);
    } catch (error) {
      console.error(error);
    }
  }

  async getAdminLoginResponse(password: string, user: Admin) {
    const isMatch = await comparePassword(password, user.password);
  
    const accessToken = isMatch
      ? await this.jwtService.signAsync({
          id: user.id,
          username: user.username,
        })
      : null;
  
    const response = isMatch
      ? {
          status: 'successful',
          message: `Welcome, ${user.username}`,
          user,
          accessToken,
        }
      : {
          status: 'failed',
          message: 'Incorrect login credentials.',
        };
  
    return response;
  }
  
  async getStudentLoginResponse(password: string, user: Student) {
    const isMatch = await comparePassword(password, user.password);
  
    const accessToken = isMatch
      ? await this.jwtService.signAsync({
          id: user.id,
          email: user.email,
        })
      : null;
  
    const response = isMatch
      ? {
          status: 'successful',
          message: `Welcome, ${user.name}`,
          user,
          accessToken,
        }
      : {
          status: 'failed',
          message: 'Incorrect login credentials.',
        };
  
    return response;
  }
  
}

