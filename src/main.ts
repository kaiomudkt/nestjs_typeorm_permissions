import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './infra/common/middlewares/exception.filter';
import { LoggerService } from './infra/utils/logger/logger.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from 'dotenv';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Sistema de cargos e permissões')
    .setDescription('Usuario possuem cargos e permissoes')
    .setVersion(process.env.BACKEND_API_VERSION || '1.0')
    .addTag('usuarios')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(
    process.env.BACKEND_API_SWAGGER || 'swagger-api',
    app,
    document,
  );
  app.enableCors();
  /**
   * explicação:
   * define a validação padrão do nest.js validationPipe para todos os endpoints/controllers
   * whitelist é um parametro do nest.js de AllowList, que ativa a funcionalidade de aceitar somente parametros definidos na DTO
   */
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  const port = process.env.BACKEND_API_PORT || 3000;
  await app.listen(port);
}

bootstrap();
