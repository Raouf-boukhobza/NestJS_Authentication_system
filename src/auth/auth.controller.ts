import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign_in.dto';

import { CreateUserDto } from 'src/users/dtos/create_user.dto';
import { AuthGuard } from '@nestjs/passport';



@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
     // Assuming AuthService is imported and available
  ) {}


  @Post('signUp')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = this.authService.signUp(createUserDto);
    return user;
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  
}
