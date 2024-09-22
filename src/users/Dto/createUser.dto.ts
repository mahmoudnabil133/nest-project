import { IsEmail,  IsEnum,  isEnum,  IsNotEmpty,  IsNumber,  IsString, MinLength } from "class-validator";

export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty() 
    name: string;
    
    @IsEmail()
    email: string;
    
    @IsNumber()
    age: number;
    
    @MinLength(6)
    password: string;
    
    @IsEnum(['admin', 'user'], {message: `role must be either admin or user`})
    role: string;
}