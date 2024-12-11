import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.PREFIX ?? '');

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Nevsky bears backend api')
    .setVersion('v2')
    .addBearerAuth(
      {
        type: 'http',
        description: 'Access token in "access" header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'access',
        in: 'header',
      },
      'access-token',
    )
    // .addBearerAuth(
    //   {
    //     type: 'http',
    //     description: 'Refresh token in "refresh" header',
    //     scheme: 'bearer',
    //     bearerFormat: 'JWT',
    //     name: 'refresh',
    //     in: 'header',
    //   },
    //   'refresh-token',
    // )
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
