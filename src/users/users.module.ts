import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';

@Module({
  imports : [TypeOrmModule.forFeature([User])], // Specify the entities here if needed
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
