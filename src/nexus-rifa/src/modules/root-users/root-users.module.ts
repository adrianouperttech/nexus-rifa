import { Module } from '@nestjs/common';
import { RootUsersController } from './root-users.controller';
import { RootUsersService } from './root-users.service';

@Module({
  controllers: [RootUsersController],
  providers: [RootUsersService]
})
export class RootUsersModule {}
