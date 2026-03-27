import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rifa } from './rifa.entity';

@Injectable()
export class RifasService {
  constructor(
    @InjectRepository(Rifa)
    private rifasRepository: Repository<Rifa>,
  ) {}

  findAll(): Promise<Rifa[]> {
    return this.rifasRepository.find();
  }

  async findOne(id: number): Promise<Rifa> {
    const rifa = await this.rifasRepository.findOne({ where: { id } });
    if (!rifa) {
      throw new NotFoundException(`Rifa with ID "${id}" not found`);
    }
    return rifa;
  }

  create(rifa: Rifa): Promise<Rifa> {
    return this.rifasRepository.save(rifa);
  }

  async update(id: number, rifa: Rifa): Promise<Rifa> {
    await this.rifasRepository.update(id, rifa);
    const updatedRifa = await this.rifasRepository.findOne({ where: { id } });
    if (!updatedRifa) {
      throw new NotFoundException(`Rifa with ID "${id}" not found`);
    }
    return updatedRifa;
  }

  async remove(id: number): Promise<void> {
    const deleteResult = await this.rifasRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Rifa with ID "${id}" not found`);
    }
  }
}
