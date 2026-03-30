import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { PaymentConsumer } from './consumers/payment.consumer';
import { WhatsappConsumer } from './consumers/whatsapp.consumer';
import { EmailConsumer } from './consumers/email.consumer';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue(
      { name: 'payment' },
      { name: 'whatsapp' },
      { name: 'email' },
    ),
  ],
  providers: [PaymentConsumer, WhatsappConsumer, EmailConsumer],
})
export class QueuesModule {}
