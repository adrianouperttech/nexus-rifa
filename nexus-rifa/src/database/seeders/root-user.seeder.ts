import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RootUser } from '../../modules/root-users/entities/root-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

class RootUserSeeder {
  constructor(
    @InjectRepository(RootUser)
    private readonly rootUserRepository: Repository<RootUser>,
  ) {}

  async run() {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('root', salt);

    const rootUser = this.rootUserRepository.create({
      email: 'root@example.com',
      password: hashedPassword,
    });

    await this.rootUserRepository.save(rootUser);
  }
}

seeder({
  imports: [TypeOrmModule.forFeature([RootUser])],
}).run([RootUserSeeder]);
