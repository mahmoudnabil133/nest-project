import { Injectable, NotFoundException } from '@nestjs/common';
import { UpadateUserDto } from './Dto/updateUser.dto';
import { CreateUserDto } from './Dto/createUser.dto';
import { UserResponseDto } from './Dto/userResponse.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: 'john',
            age: 20,
            email: "test2@gmail.com",
            password: '123456',
            role: 'admin',
        },
        {
            id: 2,
            name: "",
            age: 30,
            password: '123456',
            email: "test3@gmail.com",
            role: 'user',
        },
        {
            id: 3,
            name: 'jane',
            age: 25,
            password: '123456',
            email: "test5@gmail.com",
            role: "admin"
        }
    ]
    findAll(){
        return this.users;
    }
    findOne(id: number): UserResponseDto{
        const user: CreateUserDto = this.users.find(user=> user.id === id);
        if (!user) throw new NotFoundException(`user with id :${id} not found`);
        return new UserResponseDto(user);
    };
    createOne(user: CreateUserDto): UserResponseDto{
        this.users.push({
            id: this.users.length + 1,
            ...user
        });
        return new UserResponseDto(user);
    }
    updateOne(id: number, user: UpadateUserDto): UserResponseDto{
        const idx = this.users.findIndex(user=>user.id === id);
        this.users[idx] ={
            ...this.users[idx],
            ...user
        }
        return new UserResponseDto(this.users[idx]);
    }
    deleteOne(id: number){
        this.users = this.users.filter(user=> user.id !== id);
        return {
            msg: `user with id: ${id} deleted sucessfully`
        }
    }
}
