import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAssinaturaDto } from './dto/create-assinatura.dto';
import { Assinatura } from './entities/assinatura.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Logger } from 'winston';

@Injectable()
export class AssinaturasService {
  private readonly mercadoPagoApiUrl: string;
  private readonly mercadoPagoAccessToken: string;

  constructor(
    @Inject('winston') private readonly logger: Logger,
    @InjectRepository(Assinatura)
    private readonly assinaturaRepository: Repository<Assinatura>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.mercadoPagoApiUrl = this.configService.get<string>(
      'MERCADO_PAGO_API_URL',
      'https://api.mercadopago.com',
    );
    this.mercadoPagoAccessToken = this.configService.get<string>(
      'MERCADO_PAGO_ACCESS_TOKEN',
      '',
    );
  }

  async create(
    tenant_id: string,
    createAssinaturaDto: CreateAssinaturaDto,
  ): Promise<Assinatura> {
    const { plan_id, payer_email, card_token_id } = createAssinaturaDto;

    const data = {
      preapproval_plan_id: plan_id,
      reason: `Assinatura do plano ${plan_id}`,
      payer_email: payer_email,
      card_token_id: card_token_id,
      back_url: 'https://www.mercadopago.com.br', // TODO: change to a real back url
      status: 'authorized',
    };

    try {
      const response: any = await firstValueFrom(
        this.httpService.post(`${this.mercadoPagoApiUrl}/preapproval`, data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.mercadoPagoAccessToken}`,
          },
        }),
      );

      const responseData = response.data;

      const newAssinatura = this.assinaturaRepository.create({
        id: responseData.id,
        plan_id: responseData.preapproval_plan_id,
        payer_email: responseData.payer_email,
        status: responseData.status,
        start_date: responseData.date_created,
        end_date: responseData.auto_recurring.end_date,
        next_payment_date: responseData.next_payment_date,
        tenant_id: tenant_id,
      });

      return await this.assinaturaRepository.save(newAssinatura);
    } catch (error) {
      this.logger.error('Erro ao criar assinatura no Mercado Pago:', { error });
      throw new InternalServerErrorException(
        'Falha ao se comunicar com o gateway de pagamento.',
      );
    }
  }

  async handleWebhook(data: any): Promise<any> {
    if (data.type === 'preapproval') {
      const preapprovalId = data.data.id;

      try {
        const response: any = await firstValueFrom(
          this.httpService.get(
            `${this.mercadoPagoApiUrl}/preapproval/${preapprovalId}`,
            {
              headers: {
                Authorization: `Bearer ${this.mercadoPagoAccessToken}`,
              },
            },
          ),
        );

        const preapprovalData = response.data;

        const assinatura = await this.assinaturaRepository.findOne({
          where: { id: preapprovalId },
        });

        if (assinatura) {
          assinatura.status = preapprovalData.status;
          await this.assinaturaRepository.save(assinatura);
        } else {
          this.logger.warn(
            `Assinatura com preapprovalId "${preapprovalId}" não encontrada.`,
          );
        }
      } catch (error) {
        this.logger.error(
          `Erro ao processar webhook de preapproval: ${preapprovalId}`,
          { error },
        );
        throw new InternalServerErrorException(
          'Erro ao consultar status da assinatura no gateway.',
        );
      }
    }
    return { message: 'Webhook received' };
  }

  async findByTenantId(tenantId: string): Promise<Assinatura | null> {
    return this.assinaturaRepository.findOne({
      where: { tenant_id: tenantId },
      order: { start_date: 'DESC' },
    });
  }
}
