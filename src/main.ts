import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const port = process.env.PORT  || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform: true }))
  app.enableCors({
    origin: '*',
    methods:"GET, HEAD,PUT,PATCH,DELETE,OPTIONS",
    credentials: true,
  })
  app.setGlobalPrefix('api');
  await app.listen(3000);
}

bootstrap();
