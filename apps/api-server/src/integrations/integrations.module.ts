import { Module } from '@nestjs/common';
import { EmailService } from './email/email.service';
import { WhatsappService } from './whatsapp/whatsapp.service';

@Module({
  providers: [EmailService, WhatsappService],
  exports: [EmailService, WhatsappService],
})
export class IntegrationsModule {}
