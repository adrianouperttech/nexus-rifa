import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cota } from './entities/cota.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cota])],
  controllers: [],
  providers: [],
})
export class CotasModule {}
