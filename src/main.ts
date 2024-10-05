import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { WrapDataInterceptor } from './common/interceptors/wrap-data/wrap-data.interceptor';
import { TimeoutInterceptor} from './common/interceptors/timeout/timeout.interceptor';
import * as session from 'express-session';
import { AllExceptionsFilter } from './common/interceptors/filters/all-exception-filters';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips unallowed properties
      forbidNonWhitelisted: true, // throws error if unexpected properties are found
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        const errorMessages = errors.map(error => ({
          property: error.property,
          constraints: error.constraints,
        }));
        return new BadRequestException(errorMessages);
      },
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
      maxAge: 10000
    }
  }))
//   app.useGlobalInterceptors( new WrapDataInterceptor(),
//   new TimeoutInterceptor()
// );
  app.setGlobalPrefix('api')
  app.enableCors()
  await app.listen(3000);
}
bootstrap();
