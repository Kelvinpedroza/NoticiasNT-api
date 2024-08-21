import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'comments'})
export class CommentsEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar'})
    userName: string
    @Column({type: 'varchar'})
    description: string
    @Column({type: 'varchar'})
    rating: string
    @Column({type: 'timestamptz', name: 'created_at'})
    created_at: Date
    @Column({type: 'timestamptz', name: 'deleted_at'})
    deleted_at: Date
}