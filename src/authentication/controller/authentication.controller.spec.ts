import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from './authentication.controller';

describe('AuthenticationController', () => {
  let authentication: AuthenticationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
    }).compile();

    authentication = module.get<AuthenticationController>(
      AuthenticationController,
    );
  });

  it('should be defined', () => {
    expect(authentication).toBeDefined();
  });
});
