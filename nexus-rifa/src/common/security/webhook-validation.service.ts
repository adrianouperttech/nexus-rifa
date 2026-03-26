import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class WebhookValidationService {
  validate(signature: string, body: any, secret: string): boolean {
    const hash = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(body))
      .digest('hex');
    return hash === signature;
  }
}
