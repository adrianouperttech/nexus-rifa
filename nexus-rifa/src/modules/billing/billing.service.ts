import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { PlansService } from '../plans/plans.service';
import { MercadoPago } from 'mercadopago';
import { UsersService } from '../users/users.service';
import { TenantsService } from '../tenants/tenants.service';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,

    @Inject(forwardRef(() => PlansService))
    private readonly plansService: PlansService,

    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    @Inject(forwardRef(() => TenantsService))
    private readonly tenantsService: TenantsService,

    @Inject('MERCADOPAGO')
    private readonly mercadoPago: MercadoPago,
  ) {}

  async findByTenantId(tenant_id: string): Promise<Subscription> {
    return this.subscriptionRepository.findOne({ where: { tenant_id } });
  }

  async createSubscription(
    tenant_id: string,
    plan_id: string,
    user_id: string,
  ): Promise<{ init_point: string }> {
    const plan = await this.plansService.findOne(plan_id);
    if (!plan) {
      throw new NotFoundException(`Plan with ID "${plan_id}" not found`);
    }

    const user = await this.usersService.findOne(tenant_id, user_id);
    if (!user) {
      throw new NotFoundException(`User with ID "${user_id}" not found`);
    }

    const preapprovalPlan = await this.mercadoPago.preapprovalPlan.create({
      body: {
        reason: plan.name,
        auto_recurring: {
          frequency: 1,
          frequency_type: 'months',
          transaction_amount: plan.price,
          currency_id: 'BRL',
        },
        back_url: 'https://nexus-rifa.com/billing/success',
        payer_email: user.email,
      },
    });

    const preapproval = await this.mercadoPago.preapproval.create({
      body: {
        preapproval_plan_id: preapprovalPlan.id,
        payer_email: user.email,
        back_url: 'https://nexus-rifa.com/billing/success',
      },
    });

    return { init_point: preapproval.init_point };
  }

  async handleWebhook(notification: any) {
    if (notification.type === 'preapproval') {
      const preapproval = await this.mercadoPago.preapproval.findById(
        notification.data.id,
      );

      const tenant = await this.tenantsService.findByEmail(
        preapproval.payer_email,
      );

      if (!tenant) {
        throw new NotFoundException(
          `Tenant with email "${preapproval.payer_email}" not found`,
        );
      }

      let subscription = await this.findByTenantId(tenant.id);

      if (subscription) {
        subscription.status = preapproval.status;
        subscription.payment_gateway_subscription_id = preapproval.id;
      } else {
        subscription = this.subscriptionRepository.create({
          tenant_id: tenant.id,
          plan_id: preapproval.preapproval_plan_id,
          status: preapproval.status,
          payment_gateway_subscription_id: preapproval.id,
        });
      }

      await this.subscriptionRepository.save(subscription);
    }
  }
}
