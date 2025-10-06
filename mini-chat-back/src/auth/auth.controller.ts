import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, type UserLoginBody } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() userLoginBody: UserLoginBody) {
        return await this.authService.login(userLoginBody);
    }
}
