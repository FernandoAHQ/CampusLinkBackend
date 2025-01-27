import { Module } from '@nestjs/common';
import { AuthenticationService } from './service/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/typeorm/entities/Admin';
import { AuthenticationController } from './controller/authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { Student } from 'src/typeorm/entities/Student';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Student]),
    JwtModule.register({
      global: true,
      secret: 'MarianitaSecretSeed',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
