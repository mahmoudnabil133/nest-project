import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ValidateUserMiddleware } from 'src/middlewares/validate-user.middleware';
import { User } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/profile/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    // consumer
    // .apply(ValidateUserMiddleware)
    // .forRoutes({
    //   path: 'users/:id',
    //   method: RequestMethod.GET
    // });
    
    consumer
    .apply(ValidateUserMiddleware)
    .exclude({
      path: 'users',
      method: RequestMethod.POST
    })
    .forRoutes(UsersController);
  }
}
