import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Subscription,
  SubscriptionDocument,
} from './entities/subscription.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<SubscriptionDocument>,
  ) {}

  async create(createSubscriptionDto: any): Promise<Subscription> {
    const createdSubscription = new this.subscriptionModel(
      createSubscriptionDto,
    );
    return createdSubscription.save();
  }

  async findAll(): Promise<Subscription[]> {
    return this.subscriptionModel.find().exec();
  }

  async findOne(id: string): Promise<Subscription | null> {
    return this.subscriptionModel.findOne({ id }).exec();
  }

  async update(id: string, updateSubscriptionDto: any): Promise<Subscription | null> {
    return this.subscriptionModel.findOneAndUpdate(
      { id },
      updateSubscriptionDto,
      { new: true },
    );
  }

  async remove(id: string): Promise<any> {
    return this.subscriptionModel.deleteOne({ id }).exec();
  }
}
