import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

type AuthInput = {
  userName: string;
  password: string;
};

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
    private readonly usersService: UsersService, // Assuming UsersService is imported and available
  ) {}

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.usersService.findUserByUsername(input.userName);
    if (!user) {
      return null; // User not found
    }

    const isMatch = await bcrypt.compare(input.password, user.password);
    if (!isMatch) {
      return null; // Password does not match
    }
    return {
      userId: user.id,
      userName: user.userName,
    };
  }
}
