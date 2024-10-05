import { Injectable, NotFoundException } from '@nestjs/common';
import {Post} from './posts.entity'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { CreatePostDto } from './dto/post.dto';
@Injectable()
export class PostsService {
    constructor(
        @InjectRepository (Post) private readonly postRepository: Repository<Post>,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { };
    async findAll(): Promise<Post[]> {
        return await this.postRepository.find();
    }
    async findOne(id: number): Promise<Post> {
        return await this.postRepository.findOneBy({ id });
    }
    async creaetOne(post: Post): Promise<Post> {
        this.postRepository.create(post);
        return await this.postRepository.save(post);
    }
    async createUserPost(id: number, post: CreatePostDto) {
        console.log(post);
        let user = await this.userRepository.findOneBy({ id });
        if (!user) throw new NotFoundException(`user with id :${id} not found`);
        const newPost = this.postRepository.create({...post, user});
        console.log(newPost);

        return await this.postRepository.save(newPost);

    }
}
