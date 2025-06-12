import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import dataSource from './db/data-source';


@Module({
 imports: [
  TypeOrmModule.forRoot(dataSource.options),
  UsersModule,
  AuthModule,
 ]
})
export class AppModule {}
