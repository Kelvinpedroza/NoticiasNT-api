import { ConflictException, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uuid } from 'uuid'
import { hashSync as bcryptHashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>
    ) {}

    async create(newUser: UserDto) {
        const userAleradtRegistre = await this.findByUserName(newUser.userName)

        if(userAleradtRegistre){
            throw new ConflictException(` User ${newUser.userName} já foi cadastrado `)
        }

        const dbUser = new UserEntity();
        dbUser.userName = newUser.userName
        dbUser.email = newUser.email
        dbUser.firstQuestion = newUser.firstQuestion 
        dbUser.secondQuestion = newUser.secondQuestion
        dbUser.passwordHash = bcryptHashSync(newUser.password, 10)
        const {id, userName} = await this.usersRepository.save(dbUser)
        
        return {id, userName};
    }

    async findByUserName(userName:string): Promise<UserDto | null> {
        const userFound = await this.usersRepository.findOne({
            where: {userName}
        })

        if(!userFound){
            null
        }
        return {
            id: userFound.id,
            userName: userFound.userName,
            password: userFound.passwordHash,
            email: userFound.email,
            firstQuestion: userFound.firstQuestion,
            secondQuestion: userFound.secondQuestion
        }
    }
}
