import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RootUser } from './entities/root-user.entity';

@Injectable()
export class RootUsersService {
  constructor(
    @InjectRepository(RootUser)
    private readonly rootUserRepository: Repository<RootUser>,
  ) {}

  async findByEmail(email: string): Promise<RootUser | undefined> {
    return this.rootUserRepository.findOne({ where: { email } });
  }
}
