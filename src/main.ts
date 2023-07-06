import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './infra/common/middlewares/exception.filter';
import { LoggerService } from './infra/utils/logger/logger.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Sistema de cargos e permissões')
    .setDescription('Usuario possuem cargos e permissoes')
    .setVersion(process.env.BACKEND_API_VERSION || 'v1')
    .addTag('usuarios')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.BACKEND_SWAGGER, app, document);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  const port = process.env.BACKEND_PORT || 3000;
  await app.listen(port);
}

bootstrap();
