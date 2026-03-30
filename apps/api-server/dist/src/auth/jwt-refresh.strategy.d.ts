import { Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
declare const JwtRefreshStrategy_base: new (...args: any[]) => Strategy;
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
