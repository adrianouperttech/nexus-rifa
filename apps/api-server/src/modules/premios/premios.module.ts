import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Premio } from './entities/premio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Premio])],
  controllers: [],
  providers: [],
})
export class PremiosModule {}
