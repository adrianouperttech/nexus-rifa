import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { RootUser } from '../../modules/root-users/entities/root-user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RootUserSeeder implements Seeder {
  constructor(
    @InjectRepository(RootUser)
    private readonly rootUserRepository: Repository<RootUser>,
  ) {}

  async seed(): Promise<any> {
    const existingUser = await this.rootUserRepository.findOne({ where: { email: 'root@example.com' } });

    if (existingUser) {
      console.log('Root user already exists, skipping seed.');
      return;
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('root', salt);

    const rootUser = this.rootUserRepository.create({
      email: 'root@example.com',
      password: hashedPassword,
    });

    return this.rootUserRepository.save(rootUser);
  }

  async drop(): Promise<any> {
    return this.rootUserRepository.delete({ email: 'root@example.com' });
  }
}
