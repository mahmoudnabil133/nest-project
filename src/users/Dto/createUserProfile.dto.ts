import { IsDateString, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserProfileDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    lastName: string;

    @IsString() // Expecting a date string in ISO format (e.g., 'YYYY-MM-DD')
    dob: string;
}
