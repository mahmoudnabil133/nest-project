import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor( private readonly userService: UsersService){}
    @Get()
    getUsers(@Query() query: {}){
        console.log(query);
        this.userService.findAll();
    }
    @Get(':id')
    getOneUser(@Param('id') id: string){
        this.userService.findOne(+id)
    }
    @Post()
    create(@Body() newUser: {name: string, age: number}){
        return this.userService.createOne(newUser);
    }
    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() updatedUser: {name?: string, age?: number}){
        return this.userService.updateOne(+id, updatedUser);
    }
    @Delete(':id')
    deleteUser(@Param('id') id: string){
        return this.userService.deleteOne(+id);
    }
}
