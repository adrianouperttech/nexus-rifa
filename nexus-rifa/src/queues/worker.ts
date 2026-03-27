import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { PaymentConsumer } from './consumers/payment.consumer';
import { WhatsappConsumer } from './consumers/whatsapp.consumer';
import { EmailConsumer } from './consumers/email.consumer';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  app.select(AppModule).get(PaymentConsumer);
  app.select(AppModule).get(WhatsappConsumer);
  app.select(AppModule).get(EmailConsumer);
}

bootstrap();
