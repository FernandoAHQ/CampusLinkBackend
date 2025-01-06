import { Module } from '@nestjs/common';
import { AuthenticationService } from './service/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/typeorm/entities/Admin';
import { AuthenticationController } from './controller/authentication.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
