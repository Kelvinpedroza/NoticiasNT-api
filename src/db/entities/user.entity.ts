import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'users' })
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
    @Column({type:'varchar', name:'recoverpassword'})
    recoverPasswordToken: string
    @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
    created_at: Date
    @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at', nullable: true })
    update: Date

}