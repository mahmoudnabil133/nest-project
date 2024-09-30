import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './Dto/createUser.dto';
import { UpadateUserDto } from './Dto/updateUser.dto';
@Controller('users')
export class UsersController {
    constructor( private readonly userService: UsersService){}
    @Get()
    getUsers(@Query() query: {}){
        console.log(query);
        return this.userService.findAll();
    }
    @Get(':id')
    getOneUser(@Param('id', ParseIntPipe) id: number){
        return this.userService.findOne(id)
    }
    @Post()
    create(@Body() newUser: CreateUserDto){
        return this.userService.createOne(newUser);
    }
    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updatedUser: UpadateUserDto){
        return this.userService.updateOne(id, updatedUser);
    }
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number){
        return this.userService.deleteOne(id);
    }
}
