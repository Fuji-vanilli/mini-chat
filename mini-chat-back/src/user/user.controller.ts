import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('all')
    findAll(): string {
        return this.userService.getUsers();
    }

    @Get('/:id')
    findOne(@Param('id') id: number): string {
        return this.userService.getUserById(id);
    }
}
