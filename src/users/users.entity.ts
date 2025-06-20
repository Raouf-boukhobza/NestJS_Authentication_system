import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number;
 
    @Column()
    userName: string;

    @Column()
    password: string;


    @Column({ default: true })
    isActive: boolean;

}