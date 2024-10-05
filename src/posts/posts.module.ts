import { Module} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Post } from './posts.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User, Post])],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
