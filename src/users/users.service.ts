import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './user.dto';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../db/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
    private secret: string;
    private jwtExpirationTimeInSeconds: number;

    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        this.secret = this.configService.get<string>('JWT_SECRET');
        this.jwtExpirationTimeInSeconds = +this.configService.get<number>('JWT_EXPIRATION_TIME');
    }


    private toDto(userEntity: UserEntity): UserDto {
        return {
            id: userEntity.id,
            userName: userEntity.userName,
            email: userEntity.email,
            firstQuestion: userEntity.firstQuestion,
            secondQuestion: userEntity.secondQuestion,
            password: '', // Não deve ser exposto, mas se necessário, você pode usar isso como placeholder
        };
    }
    async create(newUser: UserDto) {
        const userAlreadyRegistered = await this.findByUserName(newUser.userName);

        if (userAlreadyRegistered) {
            throw new ConflictException(`User ${newUser.userName} já foi cadastrado`);
        }

        const dbUser = new UserEntity();
        dbUser.userName = newUser.userName;
        dbUser.email = newUser.email;
        dbUser.firstQuestion = newUser.firstQuestion;
        dbUser.secondQuestion = newUser.secondQuestion;
        dbUser.passwordHash = bcryptHashSync(newUser.password, 10);
        
        const { id, userName } = await this.usersRepository.save(dbUser);
        return { id, userName };
    }

    async findByUserName(userName: string): Promise<UserDto | null> {
        const userFound = await this.usersRepository.findOne({
            where: { userName }
        });

        if (!userFound) {
            return null;
        }

        return {
            id: userFound.id,
            userName: userFound.userName,
            password: userFound.passwordHash, // Geralmente, você não retorna a senha
            email: userFound.email,
            firstQuestion: userFound.firstQuestion,
            secondQuestion: userFound.secondQuestion,
            recoverPasswordToken: ''
        };
    }

    async recoverPassword(user: UserDto): Promise<string | null> {
        const token = await this.recoverPassFirstStep(user);
        return token;
    }

    private generateToken(user: UserDto): string {
        const payload = {
            email: user.email,
        };

        return this.jwtService.sign(payload, { secret: this.secret, expiresIn: this.jwtExpirationTimeInSeconds });
    }

    async recoverPassFirstStep(user: UserDto): Promise<string | null> {
        const findUser = await this.usersRepository.findOne({
            where: { email: user.email }
        });

        if (!findUser) {
            throw new NotFoundException('Usuário não encontrado');
        }

        if (findUser.firstQuestion === user.firstQuestion && findUser.secondQuestion === user.secondQuestion) {
            return this.generateToken(this.toDto(findUser)); // Retorna o token
        }

        throw new NotFoundException('Respostas de segurança incorretas');
    }
}
