import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

    getUsers() {
        return 'This action returns all users';
    }

    getUserById(id: number) {
        return `This action returns user with id: ${id}`;
    }
}
