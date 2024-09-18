import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { hostname } from 'os';

const port = process.env.PORT  || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform: true }))
  // app.enableCors({
  //   origin: true,
  //   methods:"GET, HEAD,PUT,PATCH,DELETE,OPTIONS",
  //   credentials: true,
  // })
  app.enableCors({
    origin: '*', // Substitua pelo seu domínio ou use '*' para permitir todos os domínios
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(port, '0.0.0.0');
}
bootstrap();
