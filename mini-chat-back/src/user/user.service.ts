import { Injectable } from '@nestjs/common';
import { last } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async getUsers() {
        const users = await this.prismaService.user.findMany({
            select: {
                id: true,
                email: true,
                firstname: true,
                lastname: true,
            }
        });

        return users;
    }

    async getUserById(id: string) {
        const existingUser = await this.prismaService.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                firstname: true,
                lastname: true,
            },
        });

        if (!existingUser) {
            throw new Error('User not found');
        }
        
        return existingUser;
    }
}
