import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;
    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;


}

enum user {
    user,
    admin
}