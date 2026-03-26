import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AssinaturasService } from '../../modules/assinaturas/assinaturas.service';
export declare class BillingGuard implements CanActivate {
    private readonly assinaturasService;
    constructor(assinaturasService: AssinaturasService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
