import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RifasController } from './rifas.controller';
import { RifasService } from './rifas.service';
import { Rifa } from './rifa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rifa])],
  controllers: [RifasController],
  providers: [RifasService],
})
export class RifasModule {}
