import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties not defined in the DTO
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are sent
      transform: true, // Automatically transform request payloads to DTO instances
    }),
  );
  app.enableCors({
    origin: 'http://localhost:5173', // Allow only this origin
    methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    allowedHeaders: ['Authorization', 'Content-Type'], // Allowed headers
    credentials: true, // Allows cookies with requests
  });
  await app.listen(3000);
}
bootstrap();
