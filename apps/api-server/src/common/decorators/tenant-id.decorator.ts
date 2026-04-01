import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const TenantId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const tenant_id = request.user?.tenant_id;

    if (!tenant_id) {
      throw new UnauthorizedException('Tenant ID not found in token.');
    }

    return tenant_id;
  },
);
