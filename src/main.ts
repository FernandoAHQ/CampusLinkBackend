// main.ts (entry point of the application)
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enabling global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip out properties not defined in the DTO
      forbidNonWhitelisted: true, // Throw error if unknown properties are sent
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );

  await app.listen(3000);
}
bootstrap();
