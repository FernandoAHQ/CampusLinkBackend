// middlewares/validate-dto.middleware.ts
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestException, NestMiddleware } from '@nestjs/common';

export class ValidateDtoMiddleware implements NestMiddleware {
  constructor(private readonly dtoClass: any) {}

  async use(req: any, res: any, next: () => void) {
    console.log('Incoming Data:', req.body); // Debugging Line

    // Convert plain request body into a validated DTO instance
    const dtoObject = plainToInstance(this.dtoClass, req.body, {
      enableImplicitConversion: true, // Important for auto-type conversion
    });

    // Run the validation
    const errors = await validate(dtoObject, {
      whitelist: true, // Strips fields not defined in the DTO
      forbidNonWhitelisted: true, // Throws an error for extra fields
    });

    // If there are errors, return a BadRequestException with detailed messages
    if (errors.length > 0) {
      console.error('Validation Errors:', errors); // Debugging Line
      const errorMessages = errors
        .map((err) => Object.values(err.constraints).join(', '))
        .join('; ');
      throw new BadRequestException(`Validation failed: ${errorMessages}`);
    }

    next();
  }
}
