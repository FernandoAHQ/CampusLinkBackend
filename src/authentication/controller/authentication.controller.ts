import { Post, Body, Controller } from '@nestjs/common';
import { AdminLoginDto } from '../dtos/AdminLogin.dto';
import { AuthenticationService } from '../service/authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('login/admin')
  loginAdmin(@Body() adminLoginDto: AdminLoginDto) {
    return this.authenticationService.adminLogin(adminLoginDto);
  }
}
