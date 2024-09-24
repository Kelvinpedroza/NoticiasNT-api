import { Body, Controller, HttpStatus, Patch, Post, Put, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RecoverDto } from './Recover.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('cadastro')
    async create(@Body() user: UserDto) {
        const result = await this.usersService.create(user)
        return result
    }
    @Post('recover')
    async recoverPass(@Body() recoveDto:RecoverDto, @Res() res:Response){
        const result = this.usersService.recoverPassFirstStep(recoveDto)
        
        return res.status(HttpStatus.OK).json({
            message: (await result).message,
            recoverTokenPassword: ((await result).token)
        })
    }
    @UseGuards(AuthGuard)
    @Put('recover/second')
    async recoverPassSecond(@Body() recoverDto: RecoverDto, @Res() res:Response){
        const result = this.usersService.recoverPassSecondStep(recoverDto)
        
        return res.status(HttpStatus.OK).json({
            message: (await result).message,
            email: ((await result).email)
        })
    }
}
