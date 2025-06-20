import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuar implements CanActivate {
  constructor(
    private readonly jwtService : JwtService,
    private readonly configService : ConfigService,
  ) {}

   
  private extractTokenFromHeaders(request : Request) : string | undefined {
     const [type , token] = request.headers.authorization?.split(' ') ?? [];
     return type === 'Bearer' ? token : undefined;
  }

  async canActivate (
    context: ExecutionContext,
  ):Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeaders(request);
    if (!token) {
      throw new UnauthorizedException('Unauthorized: No token provided');
    }
    try{
      const payload = this.jwtService.verifyAsync(
      token , 
      {
        secret: this.configService.get<string>('JWT_SECRET')
      }
    )
     request['user'] = payload;
    }catch {
      throw new UnauthorizedException('Unauthorized: Invalid token');
    }
    return true;
  }
}
