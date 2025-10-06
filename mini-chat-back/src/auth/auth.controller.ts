import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService, type UserLoginBody } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(JwtAuthGuard)
    @Post('login')
    async login(@Body() userLoginBody: UserLoginBody) {
        return await this.authService.login(userLoginBody);
    }
}
