import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, type UserLoginBody } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() userLoginBody: UserLoginBody) {
        return this.authService.login(userLoginBody);
    }
}
