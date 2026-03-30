import Transport from 'winston-transport';
import axios from 'axios';

export class WebhookTransport extends Transport {
  private webhookUrl: string;

  constructor(opts) {
    super(opts);
    this.webhookUrl = opts.webhookUrl;
  }

  log(info: any, callback: () => void) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    if (info.level === 'error') {
      axios.post(this.webhookUrl, { content: `🚨 **${info.level.toUpperCase()}**: ${info.message}` })
        .catch(err => console.error('Error sending to webhook:', err));
    }

    callback();
  }
}
