import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', name: 'username' })
    userName: string
    @Column({ type: 'varchar', name: 'password_hash' })
    passwordHash: string
    @Column({ type: 'varchar' })
    email: string
    @Column({ type: 'varchar', name: 'firstquestion' })
    firstQuestion: string
    @Column({ type: 'varchar', name: 'secondquestion' })
    secondQuestion: string
    @Column({ type: 'timestamptz', name: 'created_at' })
    created_at: Date
    @Column({ type: 'timestamptz', name: 'updated_at' })
    update: Date

}