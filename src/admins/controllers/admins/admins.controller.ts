import { Body, Controller, Post } from '@nestjs/common';
import { CreateAdminDto } from 'src/admins/dtos/createAdmin.dto';
import { AdminsService } from 'src/admins/service/admins/admins.service';

@Controller('admins')
export class AdminsController {
  constructor(private adminsService: AdminsService) {}

  @Post('create')
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.createAdmin(createAdminDto);
  }
}
