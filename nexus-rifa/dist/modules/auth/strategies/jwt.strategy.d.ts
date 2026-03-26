import { UsersService } from '../../users/users.service';
declare const JwtStrategy_base: new (...args: unknown[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersService;
    constructor(usersService: UsersService);
    validate(req: any, payload: any): Promise<import("../../users/entities/user.entity").User>;
}
export {};
