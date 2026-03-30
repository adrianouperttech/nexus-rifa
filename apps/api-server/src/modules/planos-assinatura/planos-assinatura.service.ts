import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlanoAssinaturaDto } from './dto/create-plano-assinatura.dto';
import { PlanoAssinatura } from './entities/plano-assinatura.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PlanosAssinaturaService {
  private readonly mercadoPagoApiUrl: string;
  private readonly mercadoPagoAccessToken: string;

  constructor(
    @InjectRepository(PlanoAssinatura)
    private readonly planoAssinaturaRepository: Repository<PlanoAssinatura>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.mercadoPagoApiUrl = this.configService.get<string>(
      'MERCADO_PAGO_API_URL',
      '',
    );
    this.mercadoPagoAccessToken = this.configService.get<string>(
      'MERCADO_PAGO_ACCESS_TOKEN',
      '',
    );
  }

  async create(
    createPlanoAssinaturaDto: CreatePlanoAssinaturaDto,
  ): Promise<PlanoAssinatura> {
    const { reason, auto_recurring, back_url } = createPlanoAssinaturaDto;

    const data = {
      reason: reason,
      auto_recurring: auto_recurring,
      back_url: back_url,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.mercadoPagoApiUrl}/preapproval_plan`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.mercadoPagoAccessToken}`,
            },
          },
        ),
      );

      const responseData = response.data as any;

      const newPlanoAssinatura = this.planoAssinaturaRepository.create({
        id: responseData.id,
        reason: responseData.reason,
        status: responseData.status,
      });

      return await this.planoAssinaturaRepository.save(newPlanoAssinatura);
    } catch (error: any) {
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      } else {
        throw new HttpException(
          error.message,
          error.status || '500'
        );
      }
    }
  }
}
