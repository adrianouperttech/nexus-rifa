import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetTenantInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.tenant;
  },
);

export interface TenantInfo {
  id: string;
}
