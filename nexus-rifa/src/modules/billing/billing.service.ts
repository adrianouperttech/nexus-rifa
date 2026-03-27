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
import MercadoPago, { PreApproval, PreApprovalPlan } from 'mercadopago';
import { UsersService } from '../users/users.service';
import { TenantsService } from '../tenants/tenants.service';

@Injectable()
export class BillingService {
  private preApprovalPlanClient: PreApprovalPlan;
  private preApprovalClient: PreApproval;

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
  ) {
    this.preApprovalPlanClient = new PreApprovalPlan(this.mercadoPago);
    this.preApprovalClient = new PreApproval(this.mercadoPago);
  }

  async findByTenantId(tenant_id: string): Promise<Subscription | null> {
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

    const preapprovalPlan = await this.preApprovalPlanClient.create({
      body: {
        reason: plan.name,
        auto_recurring: {
          frequency: 1,
          frequency_type: 'months',
          transaction_amount: plan.price,
          currency_id: 'BRL',
        },
        back_url: 'https://nexus-rifa.com/billing/success',
      },
    });

    const preapproval = await this.preApprovalClient.create({
      body: {
        preapproval_plan_id: preapprovalPlan.id,
        payer_email: user.email,
        back_url: 'https://nexus-rifa.com/billing/success',
      },
    });

    if (!preapproval.init_point) {
      throw new Error('Failed to create subscription');
    }

    let subscription = await this.findByTenantId(tenant_id);
    if (subscription) {
      subscription.plan_id = plan_id;
      if (preapproval.id) {
        subscription.payment_gateway_subscription_id = preapproval.id;
      }
      if (preapproval.status) {
        subscription.status = preapproval.status;
      }
    } else {
      subscription = this.subscriptionRepository.create({
        tenant_id,
        plan_id,
        payment_gateway_subscription_id: preapproval.id,
        status: preapproval.status,
      });
    }
    await this.subscriptionRepository.save(subscription);

    return { init_point: preapproval.init_point };
  }

  async handleWebhook(notification: any) {
    if (notification.type === 'preapproval') {
      const preapproval = await this.preApprovalClient.get({
        id: notification.data.id,
      });

      if (!preapproval.id) {
        return;
      }

      const subscription = await this.subscriptionRepository.findOne({
        where: { payment_gateway_subscription_id: preapproval.id },
      });

      if (subscription) {
        if (preapproval.status) {
          subscription.status = preapproval.status;
        }
        await this.subscriptionRepository.save(subscription);
      }
    }
  }
}
