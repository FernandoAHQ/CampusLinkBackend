import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminLoginParams } from '../utils/types';
import { FindOptionsWhere } from 'typeorm';
import { Admin } from 'src/typeorm/entities/Admin';
import { comparePassword } from 'src/utils/security';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
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
}
