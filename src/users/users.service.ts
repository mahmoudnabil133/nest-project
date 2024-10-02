import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpadateUserDto } from './Dto/updateUser.dto';
import { CreateUserDto } from './Dto/createUser.dto';
import { UserResponseDto } from './Dto/userResponse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>
    ){}
    async findAll(): Promise<UserResponseDto[]>{
        const users : User[]= await this.userRepository.find();
        return users.map(user => new UserResponseDto(user));
    }
    async findOne(id: number): Promise<UserResponseDto>{
        const user: User = await this.userRepository.findOneBy({ id })
        if (!user) throw new NotFoundException(`user with id :${id} not found`);
        
        return new UserResponseDto(user);
    };
    async createOne(user: CreateUserDto): Promise<UserResponseDto>{
        const hashedPass = await bcrypt.hash(user.password, 12);
        let newUser = this.userRepository.create({...user, password: hashedPass});
        newUser = await this.userRepository.save(newUser);
        return new UserResponseDto(newUser)
    }
    async updateOne(id: number, user: UpadateUserDto): Promise<UserResponseDto>{
        let existingUser = await this.userRepository.findOneBy({ id });
        if (!existingUser) throw new NotFoundException(`user with id :${id} not found`);
        
        if (user.password) {
            const hashedPass = await bcrypt.hash(user.password, 12);
            user.password = hashedPass;
        }
        const updatedUser = { ...existingUser, ...user };
        await this.userRepository.save(updatedUser);
        return new UserResponseDto(updatedUser);
    }
    async deleteOne(id: number) {
        const res = await this.userRepository.delete(id);
        if (res.affected === 0) throw new NotFoundException(`user with id :${id} not found`);
    }
}
