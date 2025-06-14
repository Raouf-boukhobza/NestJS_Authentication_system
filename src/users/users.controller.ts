import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create_user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  


  @Get(":username")
  async findUserByUsername(@Param('username') username: string): Promise<User | null> {
    return this.usersService.findUserByUsername(username);
  }
}
