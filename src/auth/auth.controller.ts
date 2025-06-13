import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign_in.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService, // Assuming AuthService is imported and available
    ) {}


    @Post('login')
    signIn(
        @Body() signInDto: SignInDto 
    ){
        return this.authService.signIn(signInDto);
    }



    
}
