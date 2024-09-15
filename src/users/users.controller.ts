import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';
import { AuthGuard } from '../auth/auth.guard';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('cadastro')
    create(@Body() user: UserDto) {
        this.usersService.create(user)
    }
}
