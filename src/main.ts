import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { SeedService } from './modules/seed/seed.service';

async function bootstrap() {
  // Load environment variables
  config();

  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  const seed = app.get(SeedService);
  // Enable global validation using class-validator
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true, // Strips unallowed properties
    forbidNonWhitelisted: true, // Throws an error if an unknown property is sent
    transform: true, // Automatically transforms request payloads to DTOs
  }));
  await seed.seedAdmin();
  // Enable CORS
  app.enableCors();

  // Setup Swagger for API documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('My NestJS API')
    .setDescription('API documentation for MySQL-based NestJS project')
    .setVersion('1.0')
    .addBearerAuth() // Adds JWT authentication support
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📄 Swagger API docs available at http://localhost:${PORT}/api-docs`);
}
bootstrap();
