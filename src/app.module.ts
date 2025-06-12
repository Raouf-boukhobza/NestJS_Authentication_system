import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import dataSource from './db/data-source';


@Module({
 imports: [
  TypeOrmModule.forRoot(dataSource.options),
  UsersModule,
 ]
})
export class AppModule {}
