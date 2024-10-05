import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    title: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    description: string;
}