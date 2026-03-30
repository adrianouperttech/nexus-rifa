import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    const createdSubscription = this.subscriptionRepository.create(
      createSubscriptionDto,
    );
    return await this.subscriptionRepository.save(createdSubscription);
  }

  async findAll(): Promise<Subscription[]> {
    return this.subscriptionRepository.find();
  }

  async findOne(id: string): Promise<Subscription | null> {
    return this.subscriptionRepository.findOne({ where: { id } });
  }

  async update(id: string, updateSubscriptionDto: any): Promise<Subscription | null> {
    await this.subscriptionRepository.update(id, updateSubscriptionDto);
    return this.subscriptionRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<any> {
    return this.subscriptionRepository.delete(id);
  }
}
