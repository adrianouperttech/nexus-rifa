"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const root_users_service_1 = require("../../../root-users/root-users.service");
let AdminAuthService = class AdminAuthService {
    constructor(rootUsersService, jwtService) {
        this.rootUsersService = rootUsersService;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const rootUser = await this.rootUsersService.findByEmail(email);
        if (!rootUser) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordMatching = await bcrypt.compare(password, rootUser.password);
        if (!isPasswordMatching) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: rootUser.id, email: rootUser.email, is_root: true };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
AdminAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [root_users_service_1.RootUsersService,
        jwt_1.JwtService])
], AdminAuthService);
exports.AdminAuthService = AdminAuthService;
//# sourceMappingURL=admin-auth.service.js.map