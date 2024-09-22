import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: 'John Doe',
            age: 25
        },
        {
            id: 2,
            name: 'Jane Doe',
            age: 26
        },
        {
            id: 3,
            name: 'Jim Doe',
            age: 27
        }
    ]
    findAll(){
        return this.users;
    }
    findOne(id: number){
        return this.users.find(user=> user.id === id);
    };
    createOne(user: {name: string, age: number}){
        this.users.push({
            id: this.users.length + 1,
            ...user
        });
        return user
    }
    updateOne(id: number, user: {name?: string, age?: number}){
        const idx = this.users.findIndex(user=>user.id === id);
        this.users[idx] ={
            ...this.users[idx],
            ...user
        }
        return this.users[idx];
    }
    deleteOne(id: number){
        this.users = this.users.filter(user=> user.id !== id);
        return {
            msg: `user with id: ${id} deleted sucessfully`
        }
    }
}
