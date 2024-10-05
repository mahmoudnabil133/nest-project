import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './Dto/createUser.dto';
import { UpadateUserDto } from './Dto/updateUser.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserProfileDto } from './Dto/createUserProfile.dto';
import { AnyARecord } from 'dns';
@Controller('users')
export class UsersController {
    constructor( private readonly userService: UsersService){}
    @Get()
    async getUsers(@Query() query: {}, @Req() req: Request): Promise<any>{
        console.log(req.body);
        await new Promise((resolve, reject)=>{
            setTimeout(resolve, 2000)
        });
        return await this.userService.findAll();
    }
    
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getOneUser(@Param('id', ParseIntPipe) id: number){
        return await this.userService.findOne(id)
    }
    @Post()
    async create(@Body() newUser: CreateUserDto){
        return await this.userService.createOne(newUser);
    }
    @Patch(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updatedUser: UpadateUserDto){
        return await this.userService.updateOne(id, updatedUser);
    }
    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number){
        return await this.userService.deleteOne(id);
    }

    @Post(`:id/profile`)
    async createUserProfile(@Param('id', ParseIntPipe) id: number, @Body() profile: any){
        return await this.userService.createUserProfile(id, profile);
    }
}
