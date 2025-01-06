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
          accessToken,
        }
      : {
          status: 'failed',
          message: 'Incorrect login credentials.',
        };

    return response;
  }
}
