import { ReservasService } from '../modules/reservas/reservas.service';
import { TenantsService } from '../modules/tenants/tenants.service';
import { BillingService } from '../modules/billing/billing.service';
export declare class AutomationsService {
    private readonly reservasService;
    private readonly tenantsService;
    private readonly billingService;
    private readonly logger;
    constructor(reservasService: ReservasService, tenantsService: TenantsService, billingService: BillingService);
    handleExpireReservas(): Promise<void>;
    handleSaaSCobrança(): Promise<void>;
}
