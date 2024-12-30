import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppConfig } from './config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<AppConfig>);

  app.enableCors({
    origin: ['https://itmo.website', 'http://localhost:8081'],
    credentials: true,
    exposedHeaders: ['authorization', 'refresh'],
  });

  app.setGlobalPrefix(configService.get('prefix'));

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
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
    // .addServer('https://itmo.website/')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    configService.get('prefix')
      ? `${configService.get('prefix')}/swagger`
      : 'swagger',
    app,
    documentFactory,
    {
      customSiteTitle: 'Nevsky Bears API v2',
    },
  );

  app.use(cookieParser());

  await app.listen(configService.get('port'));
}

bootstrap();
