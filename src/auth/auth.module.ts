import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';

@Module({
  providers: [AuthService , LocalStrategy],
  controllers: [AuthController],
  imports: [UsersModule , 
    JwtModule.registerAsync({
      global: true, 
      inject: [ConfigService],
      useFactory: (configService : ConfigService) => ({
        secret : configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' }, // Token expiration time,
        
    })
    }) , 
   

  ],
})
export class AuthModule {}
