import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export type UserLoginBody = {
    email: string;
    password: string;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService) {}

    async login(userLoginBody: UserLoginBody) {
        const existingUser = await this.prismaService.user.findUnique({
            where: { email: userLoginBody.email },
        });
        
        if (!existingUser) {
            throw new Error('User not found !!!');
        }
        
        const isCorrectPassword = await this.isCorrectPassword({ 
            password: userLoginBody.password, 
            hashedPassword: existingUser.password });
        
        if (!isCorrectPassword) {
            throw new Error('Error password !!!');
        }

        return await this.authenticateUser(existingUser.id, existingUser.email);
    }

    private async hashPassword(password: string) {
        const hashedPassword = await hash(password, 10);
        return hashedPassword;
    }

    private async isCorrectPassword({ password, hashedPassword } : { password: string, hashedPassword: string}) {
        return await compare(password, hashedPassword);
    }

    async authenticateUser(userId: string, email: string) {
        const payload = { sub: userId, email };
        return await this.jwtService.signAsync(payload);
    }
}
