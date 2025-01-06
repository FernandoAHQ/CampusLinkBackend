import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';

describe('ServiceService', () => {
  let authentication: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationService],
    }).compile();

    authentication = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(authentication).toBeDefined();
  });
});
