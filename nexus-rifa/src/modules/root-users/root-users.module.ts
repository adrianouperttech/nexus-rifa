import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RootUser } from './entities/root-user.entity';
import { RootUsersService } from './root-users.service';

@Module({
  imports: [TypeOrmModule.forFeature([RootUser])],
  providers: [RootUsersService],
  exports: [RootUsersService],
})
export class RootUsersModule {}
