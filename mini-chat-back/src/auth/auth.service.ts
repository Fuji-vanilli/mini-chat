import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export type UserLoginBody = {
    email: string;
    password: string;
}

export type UserRegisterBody = {
    email: string;
    password: string;
    firstname?: string;
    lastname?: string;
}

export type UserPayload = {
    userId: string;
    email: string;
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

        return await this.authenticateUser({ userId: existingUser.id, email: existingUser.email });
    }

    async register(userRegisterBody: UserRegisterBody) {
        const existingUser = await this.prismaService.user.findUnique({
            where: { email: userRegisterBody.email },
        });

        if (existingUser) {
            throw new Error('User already exists !!!');
        }

        const hashedPassword = await this.hashPassword(userRegisterBody.password);
        const newUser = await this.prismaService.user.create({
            data: {
                email: userRegisterBody.email,
                password: hashedPassword,
                firstname: userRegisterBody.firstname!,
                lastname: userRegisterBody.lastname!,
            },
        });

        return await this.authenticateUser({ userId: newUser.id, email: newUser.email });
    }

    private async hashPassword(password: string) {
        const hashedPassword = await hash(password, 10);
        return hashedPassword;
    }

    private async isCorrectPassword({ password, hashedPassword } : { password: string, hashedPassword: string}) {
        return await compare(password, hashedPassword);
    }

    async authenticateUser({ userId, email }: UserPayload) {
        const payload = { sub: userId, email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
