import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { WrapDataInterceptor } from './common/interceptors/wrap-data/wrap-data.interceptor';
import { TimeoutInterceptor} from './common/interceptors/timeout/timeout.interceptor';
import * as session from 'express-session';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );
  app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
      maxAge: 10000
    }
  }))
  app.useGlobalInterceptors( new WrapDataInterceptor(),
  new TimeoutInterceptor()
);
  app.setGlobalPrefix('api')
  app.enableCors()
  await app.listen(3000);
}
bootstrap();
