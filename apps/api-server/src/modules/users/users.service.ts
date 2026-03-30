import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(tenant_id: string, createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
      tenant_id,
    });
    return this.userRepository.save(user);
  }

  async findAll(tenant_id: string): Promise<User[]> {
    return this.userRepository.find({ where: { tenant_id } });
  }

  async findOne(tenant_id: string, id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      id,
      tenant_id,
    });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async findByEmail(tenant_id: string, email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      email,
      tenant_id,
    });
    if (!user) {
      throw new NotFoundException(`User with email "${email}" not found`);
    }
    return user;
  }

  async update(
    tenant_id: string,
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return this.userRepository.save(user);
  }

  async remove(tenant_id: string, id: string): Promise<void> {
    const result = await this.userRepository.delete({ id, tenant_id });
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }
}
