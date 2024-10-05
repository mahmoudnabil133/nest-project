import { Profile } from "src/profile/profile.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToOne(()=> Profile)
    @JoinColumn()
    profile: Profile;
}

enum user {
    user,
    admin
}