import { Post } from "../posts/posts.entity";
import { Profile } from "src/profile/profile.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(()=> Post, (post)=> post.user)
    posts: Post[]
}

enum user {
    user,
    admin
}