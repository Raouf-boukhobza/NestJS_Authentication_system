import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dtos/sign_in.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/users.entity';

type SignInData = {
  id: number;
  userName: string;
};

type SignUpResult= {
  userId: number;
  userName: string;
};

type AuthResult = {
  userId: number;
  userName: string;
  token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService : ConfigService // Assuming JwtService is imported and available
  ) {}

  async validateUser(
    userName: string,
    userPassword: string,
  ): Promise<SignInData | null> {
    const user = await this.usersService.findUserByUsername(userName);
    if (!user) {
      return null; // User not found
    }

    const isMatch = await bcrypt.compare(userPassword, user.password);
    if (!isMatch) {
      return null; // Password does not match
    }
    const {password , ...result} = user
    return result as SignInData; // Return user data without password
  }

  async signIn(user : User): Promise<AuthResult> {
    const payload = { sub: user.id, userName: user.userName };
    const token = await this.jwtService.signAsync(payload);
    return {
      userId: user.id,
      userName: user.userName,
      token: token,
    } as AuthResult;
  }

  async signUp(createUserDto: SignInDto): Promise<SignUpResult> {
    const user = await this.usersService.createUser(createUserDto);
    return {
      userId: user.id,
      userName: user.userName,
    } ;
  }
}
