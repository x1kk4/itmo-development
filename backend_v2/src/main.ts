import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['https://itmo.website', 'http://localhost:8081'],
    credentials: true,
    allowedHeaders: '*',
    exposedHeaders: ['authorization', 'refresh'],
  });

  app.setGlobalPrefix(process.env.PREFIX ?? '');

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Nevsky Bears API')
    .setVersion('v2')
    .addBearerAuth(
      {
        type: 'http',
        description: 'Access token in "access" header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    process.env.PREFIX ? `${process.env.PREFIX}/swagger` : 'swagger',
    app,
    documentFactory,
    {
      customSiteTitle: 'Nevsky Bears API v2',
    },
  );

  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
