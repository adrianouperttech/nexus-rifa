import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { AssinaturasService } from '../../modules/assinaturas/assinaturas.service';

@Injectable()
export class BillingGuard implements CanActivate {
  constructor(private readonly assinaturasService: AssinaturasService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tenantId = request.params.tenant_id;

    if (!tenantId) {
      // Or handle as per your application's logic if tenant_id is not always expected
      throw new ForbiddenException('Tenant ID is missing');
    }

    const isBillingOk = await this.assinaturasService.isBillingActive(tenantId);
    if (!isBillingOk) {
      throw new ForbiddenException('Plano vencido ou assinatura inativa.');
    }

    return true;
  }
}
