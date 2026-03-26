import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

export type SubscriptionDocument = Subscription & Document;

@Schema({
  timestamps: true,
})
export class Subscription {
  @Prop({
    type: String,
    default: uuidV4,
  })
  id: string;

  @Prop({
    type: String,
    required: true,
  })
  userId: string;

  @Prop({
    type: String,
    required: true,
  })
  planId: string;

  @Prop({
    type: String,
    enum: ['active', 'inactive', 'cancelled'],
    default: 'active',
  })
  status: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
