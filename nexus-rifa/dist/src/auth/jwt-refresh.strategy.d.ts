import { Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
declare const JwtRefreshStrategy_base: new (...args: unknown[] | [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(req: any, payload: any): Promise<{
        userId: any;
        email: any;
        roles: any;
    }>;
}
export {};
