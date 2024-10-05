import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { GateWay } from './gateway/events.gateway';
import { SocketClient } from './socket/socket-client';
import { Profile } from './profile/profile.entity';

@Module({
  imports: [UsersModule,
    DatabaseModule,
    EmployeesModule,
    ThrottlerModule.forRoot([{
      name: "short",
      ttl:1000,
      limit: 3
    },{
      name: "long",
      ttl: 60000,
      limit: 100
    }]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '3mod4od123321',
      database: 'nest',
      entities: [User, Profile],
      synchronize: true,
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  },{
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor
  }, GateWay, SocketClient],
})
export class AppModule {}
