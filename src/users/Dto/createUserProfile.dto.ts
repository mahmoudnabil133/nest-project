import { Type } from "class-transformer";
import { IsDate, IsString, MinLength } from "class-validator";

export class CreateUserProfileDto {
    @IsString()
    @MinLength(4)
    firstName: string;
    
    @IsString()
    @MinLength(4)
    lastName: string;
    
    @IsString()
    dob: String;
}