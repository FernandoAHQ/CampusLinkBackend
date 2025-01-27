import { Get, Post, Body, Controller, Request, UseGuards } from '@nestjs/common';
import { AdminLoginDto } from '../dtos/AdminLogin.dto';
import { AuthenticationService } from '../service/authentication.service';
import { AuthGuard } from '../authentication.guard';
import { StudentLoginDto } from '../dtos/StudentLogin.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('login/admin')
  loginAdmin(@Body() adminLoginDto: AdminLoginDto) {
    return this.authenticationService.adminLogin(adminLoginDto);
  }

  @Post('login/student')
  loginStudent(@Body() studentLoginDto: StudentLoginDto) {
    return this.authenticationService.studentLogin(studentLoginDto);
  }

  @UseGuards(AuthGuard)
  @Get('/renew/admin')
  renewAdmin(@Request() request: Request) {
    return this.authenticationService.renewTokenAdmin(request);
  }
}
