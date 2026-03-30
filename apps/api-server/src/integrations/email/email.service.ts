import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  send(to: string, subject: string) {
    // TODO: Implement email integration
    console.log(`Sending email to ${to}: ${subject}`);
  }
}
