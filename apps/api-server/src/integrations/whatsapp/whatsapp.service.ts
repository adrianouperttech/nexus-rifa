import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappService {
  send(to: string, message: string) {
    // TODO: Implement WhatsApp integration
    console.log(`Sending WhatsApp message to ${to}: ${message}`);
  }
}
