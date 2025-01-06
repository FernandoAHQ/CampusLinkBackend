import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminLoginParams } from '../utils/types';
import { FindOptionsWhere } from 'typeorm';
import { Admin } from 'src/typeorm/entities/Admin';
import { comparePassword } from 'src/utils/security';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
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

      const isMatch = await comparePassword(password, user.password);
      return getAdminLoginResponse(isMatch, user.username);
    } catch (error) {
      console.error(error);
    }
  }
}

function getAdminLoginResponse(isMatch: boolean, username: string) {
  const response = isMatch
    ? {
        status: 'successful',
        message: `Welcome, ${username}`,
      }
    : {
        status: 'failed',
        message: 'Incorrect login credentials.',
      };

  return response;
}
