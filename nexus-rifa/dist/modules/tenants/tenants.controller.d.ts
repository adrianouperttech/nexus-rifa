import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
export declare class TenantsController {
    private readonly tenantsService;
    constructor(tenantsService: TenantsService);
    create(createTenantDto: CreateTenantDto): any;
    findAll(): any;
    findOne(id: string): any;
    findByEmail(email: string): Promise<import("./entities/tenant.entity").Tenant>;
    update(id: string, updateTenantDto: UpdateTenantDto): any;
    remove(id: string): any;
}
