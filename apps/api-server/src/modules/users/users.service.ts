import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { LoggerService } from '../../common/logger/logger.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(LoggerService) private readonly logger: LoggerService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(tenant_id: string, createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`Creating user for tenant ${tenant_id}`);
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
    this.logger.log(`Finding all users for tenant ${tenant_id}`);
    return this.userRepository.find({ where: { tenant_id } });
  }

  async findOne(tenant_id: string, id: string): Promise<User> {
    this.logger.log(`Finding user with id ${id} for tenant ${tenant_id}`);
    const user = await this.userRepository.findOneBy({
      id,
      tenant_id,
    });
    if (!user) {
      this.logger.warn(
        `User with ID "${id}" not found for tenant "${tenant_id}"`,
      );
      throw new NotFoundException(`User with ID \"${id}\" not found`);
    }
    return user;
  }

  async findByEmail(tenant_id: string, email: string): Promise<User> {
    this.logger.log(`Finding user with email ${email} for tenant ${tenant_id}`);
    const user = await this.userRepository.findOneBy({
      email,
      tenant_id,
    });
    if (!user) {
      this.logger.warn(
        `User with email "${email}" not found for tenant "${tenant_id}"`,
      );
      throw new NotFoundException(`User with email \"${email}\" not found`);
    }
    return user;
  }

  async update(
    tenant_id: string,
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    this.logger.log(`Updating user with id ${id} for tenant ${tenant_id}`);
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!user) {
      this.logger.warn(
        `User with ID "${id}" not found for tenant "${tenant_id}" to update`,
      );
      throw new NotFoundException(`User with ID \"${id}\" not found`);
    }
    return this.userRepository.save(user);
  }

  async remove(tenant_id: string, id: string): Promise<void> {
    this.logger.log(`Removing user with id ${id} for tenant ${tenant_id}`);
    const result = await this.userRepository.delete({ id, tenant_id });
    if (result.affected === 0) {
      this.logger.warn(
        `User with ID "${id}" not found for tenant "${tenant_id}" to remove`,
      );
      throw new NotFoundException(`User with ID \"${id}\" not found`);
    }
  }
}
