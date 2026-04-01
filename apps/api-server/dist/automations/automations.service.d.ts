import { ReservasService } from '../modules/reservas/reservas.service';
import { TenantsService } from '../modules/tenants/tenants.service';
export declare class AutomationsService {
    private readonly reservasService;
    private readonly tenantsService;
    private readonly logger;
    constructor(reservasService: ReservasService, tenantsService: TenantsService);
    handleExpireReservas(): Promise<void>;
    handleSaaSCobrança(): Promise<void>;
}
