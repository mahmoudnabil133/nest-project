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
// provide them if you want to use them
import { AuthModule } from './auth/auth.module';
import { GateWay } from './gateway/events.gateway';
import { SocketClient } from './socket/socket-client';
import { Profile } from './profile/profile.entity';

import { Post } from './posts/posts.entity';
import { PostsModule } from './posts/posts.module';

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
      entities: [User, Profile, Post],
      synchronize: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'mysql_db',
    //   port: 3307,
    //   database: 'nest',
    //   entities: [User, Profile, Post],
    //   username: 'testuser',
    //   password: 'testuser123',
    //   synchronize: true,
    // }),
    AuthModule,
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  },{
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor
  }],
})
export class AppModule {}
