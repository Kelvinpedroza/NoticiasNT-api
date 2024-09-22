import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './user.dto';
import { genSaltSync ,hashSync as bcryptHashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../db/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RecoverDto } from './Recover.dto';
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
            password: '',
        };
    }
    async create(newUser: UserDto) {
        const userAlreadyRegistered = await this.findByUserName(newUser.email);

        if (userAlreadyRegistered) {
            throw new ConflictException({
                message: `O email ${newUser.email} já está em uso.`,
                error: 'EmailInUse',
                statusCode: 409
            });            
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

    async findByUserName(email: string): Promise<UserDto | null> {
        const userFound = await this.usersRepository.findOne({
            where: { email }
        });

        if (!userFound) {
            return null;
        }

        return {
            id: userFound.id,
            userName: userFound.userName,
            password: userFound.passwordHash,
            email: userFound.email,
            firstQuestion: userFound.firstQuestion,
            secondQuestion: userFound.secondQuestion,
            recoverPasswordToken: ''
        };
    }

    async recoverPassword(user: RecoverDto): Promise<string | null | object> {
        const token = await this.recoverPassFirstStep(user);
        return {
            token: token
        };
    }

    private generateToken(user: RecoverDto): string {
        const payload = {
            email: user.email,
        };

        return this.jwtService.sign(payload, { secret: this.secret, expiresIn: this.jwtExpirationTimeInSeconds });
    }

    async recoverPassFirstStep(userRecover: RecoverDto): Promise<{ message: string; token?: string }> {
        const findUser = await this.usersRepository.findOne({
            where: { email: userRecover.email }
        });

        if (!findUser) {
            throw new NotFoundException('Usuário não encontrado');
        }

        if (findUser.firstQuestion === userRecover.firstQuestion && findUser.secondQuestion === userRecover.secondQuestion) {
            if (findUser.recoverPasswordToken) {
                findUser.recoverPasswordToken = '';
            }

            const token = this.generateToken(this.toDto(findUser));
            findUser.recoverPasswordToken = token;

            await this.usersRepository.save(findUser);

            return {
                message: 'true',
                token: token
            };
        }

        throw new NotFoundException('Respostas de segurança incorretas');
    }

    async recoverPassSecondStep(userRecover): Promise< {message:string, email: string} > {
        const findUser =  await this.usersRepository.findOne({
            where: {email: userRecover.email}
        })
        if (!findUser) {
            throw new NotFoundException('Usuário não encontrado');
        }
    
        if(userRecover.recoverPasswordToken === (await findUser).recoverPasswordToken){
            const saltRounds = 10
            const salt = genSaltSync(saltRounds)
            findUser.passwordHash = bcryptHashSync(userRecover.password, salt);
            await this.usersRepository.save(findUser); 
            return {
                message:'true',
                email: userRecover.email
            }
        }

        throw new UnauthorizedException('Token invalido ou ausente')
    }
}

