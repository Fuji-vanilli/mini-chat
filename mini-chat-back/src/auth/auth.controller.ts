import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService,
} from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService) {}

    //@UseGuards(JwtAuthGuard)
    @Post('login')
    async login(@Body() userLoginBody: LoginUserDto) {
        console.log(userLoginBody);
        return await this.authService.login(userLoginBody);
    }

    @Post('register')
    async register(@Body() userRegisterBody: CreateUserDto) {
        return await this.authService.register(userRegisterBody);
    }

    @UseGuards(JwtAuthGuard)    
    @Get('user')
    async getAuthenticatedUser(@Request() request) {
        return this.userService.getUserById(request.user.userId);
    }
}
