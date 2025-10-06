import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService, 
    type UserRegisterBody, 
    type UserLoginBody 
} from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService) {}

    //@UseGuards(JwtAuthGuard)
    @Post('login')
    async login(@Body() userLoginBody: UserLoginBody) {
        return await this.authService.login(userLoginBody);
    }

    @Post('register')
    async register(@Body() userRegisterBody: UserRegisterBody) {
        return await this.authService.register(userRegisterBody);
    }

    @UseGuards(JwtAuthGuard)    
    @Get('user')
    async getAuthenticatedUser(@Request() request) {
        return request.user;
    }
}
