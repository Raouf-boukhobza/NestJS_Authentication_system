import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dtos/sign_in.dto';
import { JwtService } from '@nestjs/jwt';

type SignInData = {
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
    private readonly jwtService: JwtService, // Assuming JwtService is imported and available
  ) {}

  async validateUser(
    userName: string,
    password: string,
  ): Promise<SignInData | null> {
    const user = await this.usersService.findUserByUsername(userName);
    if (!user) {
      return null; // User not found
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return null; // Password does not match
    }
    return {
      userId: user.id,
      userName: user.userName,
    };
  }

  async signIn(SignInData: SignInDto): Promise<AuthResult> {
    const user = await this.validateUser(
      SignInData.userName,
      SignInData.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.userId, userName: user.userName };
    const token = await this.jwtService.signAsync(payload);
    return {
      userId: user.userId,
      userName: user.userName,
      token: token,
    } as AuthResult;


  }
}
