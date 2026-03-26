import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

export type BillingDocument = Billing & Document;

@Schema({
  timestamps: true,
})
export class Billing {
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
    type: Date,
    required: true,
  })
  startDate: Date;

  @Prop({
    type: Date,
    required: true,
  })
  endDate: Date;

  @Prop({
    type: String,
    enum: ['active', 'inactive', 'cancelled'],
    default: 'active',
  })
  status: string;
}

export const BillingSchema = SchemaFactory.createForClass(Billing);
