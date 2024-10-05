import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/post.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post(`:id`)
    async getPosts(@Param('id', ParseIntPipe) id: number, @Body() Post: CreatePostDto) {
        return await this.postsService.createUserPost(id, Post);
    }
}
