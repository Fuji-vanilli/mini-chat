import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '3600s' },
    }),
    ],
    providers:  [
        JwtService,
        JwtStrategy
    ],
})
export class AuthModule {}
