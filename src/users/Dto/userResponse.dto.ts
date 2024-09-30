import { Exclude, Expose } from "class-transformer";

export class UserResponseDto {
    name: string;
    
    @Exclude()
    email: string;

    @Expose({name: 'Email'})
    getMail(){
        return this.email;
    }
    
    age: number;
    
    @Exclude()
    password: string;
    
    role: string;

    constructor(partial: Partial<UserResponseDto>){
        Object.assign(this, partial);
    }
}