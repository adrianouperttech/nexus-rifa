"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const subscription_entity_1 = require("./entities/subscription.entity");
const plans_service_1 = require("../plans/plans.service");
const mercadopago_1 = require("mercadopago");
const users_service_1 = require("../users/users.service");
const tenants_service_1 = require("../tenants/tenants.service");
let BillingService = class BillingService {
    subscriptionRepository;
    plansService;
    usersService;
    tenantsService;
    mercadoPago;
    constructor(subscriptionRepository, plansService, usersService, tenantsService, mercadoPago) {
        this.subscriptionRepository = subscriptionRepository;
        this.plansService = plansService;
        this.usersService = usersService;
        this.tenantsService = tenantsService;
        this.mercadoPago = mercadoPago;
    }
    async findByTenantId(tenant_id) {
        return this.subscriptionRepository.findOne({ where: { tenant_id } });
    }
    async createSubscription(tenant_id, plan_id, user_id) {
        const plan = await this.plansService.findOne(plan_id);
        if (!plan) {
            throw new common_1.NotFoundException(`Plan with ID "${plan_id}" not found`);
        }
        const user = await this.usersService.findOne(tenant_id, user_id);
        if (!user) {
            throw new common_1.NotFoundException(`User with ID "${user_id}" not found`);
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
    async handleWebhook(notification) {
        if (notification.type === 'preapproval') {
            const preapproval = await this.mercadoPago.preapproval.findById(notification.data.id);
            const tenant = await this.tenantsService.findByEmail(preapproval.payer_email);
            if (!tenant) {
                throw new common_1.NotFoundException(`Tenant with email "${preapproval.payer_email}" not found`);
            }
            let subscription = await this.findByTenantId(tenant.id);
            if (subscription) {
                subscription.status = preapproval.status;
                subscription.payment_gateway_subscription_id = preapproval.id;
            }
            else {
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
};
BillingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subscription_entity_1.Subscription)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => plans_service_1.PlansService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => tenants_service_1.TenantsService))),
    __param(4, (0, common_1.Inject)('MERCADOPAGO')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        plans_service_1.PlansService,
        users_service_1.UsersService,
        tenants_service_1.TenantsService, typeof (_a = typeof mercadopago_1.MercadoPago !== "undefined" && mercadopago_1.MercadoPago) === "function" ? _a : Object])
], BillingService);
exports.BillingService = BillingService;
//# sourceMappingURL=billing.service.js.map