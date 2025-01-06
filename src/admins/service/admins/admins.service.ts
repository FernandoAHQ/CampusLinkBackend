import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminParams } from 'src/admins/utils/types';
import { Admin } from 'src/typeorm/entities/Admin';
import { hassPassword } from 'src/utils/security';
import { Repository } from 'typeorm';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}

  async createAdmin(createAdminParams: CreateAdminParams) {
    const password = await hassPassword(createAdminParams.password);

    try {
      const newUser = this.adminRepository.create({
        ...createAdminParams,
        password,
      });
      await this.adminRepository.save(newUser);
      return {
        status: 'successful',
        message: 'User created succesfully.',
        data: newUser,
      };
    } catch (error) {
      console.log(error.message);
      return {
        status: 'error',
        message: error.message,
      };
    }
  }
}
