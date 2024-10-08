import { Body, Controller, Post } from '@nestjs/common';
import { AuthResponseDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async signIn(@Body('userEmail') userEmail: string ,@Body('password') password: string):Promise<AuthResponseDto> {
        return await this.authService.signIn(userEmail,password)
    }
}
