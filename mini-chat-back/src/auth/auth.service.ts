import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';

export type UserLoginBody = {
    email: string;
    password: string;
}

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService) {}

    login(userLoginBody: UserLoginBody) {
        const existingUser = this.prismaService.user.findUnique({
            where: { email: userLoginBody.email },
        });

        if (!existingUser) {
            throw new Error('User not found !!!');
        }

        if (existingUser.password !== this.hashPassword(userLoginBody.password)) {
            throw new Error('Error password !!!');
        }
        
        return ;
    }

    hashPassword(password: string) {
        return bcrypt.hash(password, 10);
    }
}
