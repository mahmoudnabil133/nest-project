import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'profile' })
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    dob: String;

}