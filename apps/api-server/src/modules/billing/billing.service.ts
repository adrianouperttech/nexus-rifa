
import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { MercadoPagoConfig, PreApproval } from 'mercadopago';
import { Logger } from 'winston';

@Injectable()
export class BillingService {
  private client: MercadoPagoConfig;

  constructor(
    @Inject('winston') private readonly logger: Logger,
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {
    this.client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });
  }

  async createSubscription(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<any> {
    const subscriptionRequest = {
      reason: createSubscriptionDto.reason,
      auto_recurring: {
        frequency: 1,
        frequency_type: 'months',
        transaction_amount: createSubscriptionDto.price,
        currency_id: 'BRL',
      },
      back_url: 'https://www.google.com',
      payer_email: createSubscriptionDto.payer_email,
      preapproval_plan_id: process.env.MP_PLAN_ID,
    };

    try {
      const preApprovalClient = new PreApproval(this.client);
      const response = await preApprovalClient.create({ body: subscriptionRequest });

      const subscription = this.subscriptionRepository.create({
        id: response.id,
        tenant_id: createSubscriptionDto.tenant_id,
        status: response.status,
      });
      await this.subscriptionRepository.save(subscription);

      return response;
    } catch (error) {
      this.logger.error('Erro ao criar assinatura no Mercado Pago:', { error });
      throw new InternalServerErrorException(
        'Falha ao se comunicar com o gateway de pagamento.',
      );
    }
  }

  async webhook(body: any): Promise<any> {
    if (body.type === 'preapproval') {
      try {
        const preApprovalClient = new PreApproval(this.client);
        const preapproval = await preApprovalClient.get({ id: body.data.id });
        const subscription = await this.subscriptionRepository.findOne({
          where: { id: preapproval.id },
        });

        if (subscription) {
          subscription.status = preapproval.status;
          await this.subscriptionRepository.save(subscription);
        } else {
          this.logger.warn(
            `Assinatura com id "${preapproval.id}" não encontrada.`,
          );
        }
      } catch (error) {
        this.logger.error(
          `Erro ao processar webhook de preapproval: ${body.data.id}`,
          { error },
        );
        throw new InternalServerErrorException(
          'Erro ao consultar status da assinatura no gateway.',
        );
      }
    }

    return { message: 'ok' };
  }

  async getSubscription(id: string): Promise<Subscription> {
    return this.subscriptionRepository.findOne({ where: { id } });
  }
}
