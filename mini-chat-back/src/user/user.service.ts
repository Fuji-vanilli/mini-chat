import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    getUsers() {
        return 'This action returns all users';
    }

    getUserById(id: number) {
        return `This action returns user with id: ${id}`;
    }
}
