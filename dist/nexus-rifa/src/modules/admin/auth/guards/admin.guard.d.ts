import { CanActivate, ExecutionContext } from '@nestjs/common';
declare const AdminGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AdminGuard extends AdminGuard_base implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
export {};
