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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const login_dto_1 = require("../dto/login.dto");
const logger_service_1 = require("../../../common/logger/logger.service");
let AuthService = class AuthService {
    constructor(logger, usersService, jwtService) {
        this.logger = logger;
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async login(req, loginDto) {
        const tenant_id = req.subdomains && req.subdomains.length > 0
            ? req.subdomains[0]
            : loginDto.tenant_id;
        this.logger.log(`Login attempt for tenant ${tenant_id}`);
        if (!tenant_id) {
            this.logger.warn('Login attempt without tenant');
            throw new common_1.UnauthorizedException('Tenant não identificado. Informe tenant_id.');
        }
        const { email, password } = loginDto;
        const user = await this.usersService.findByEmail(tenant_id, email);
        if (!user) {
            this.logger.warn(`Login failed for email \"${email}\" in tenant \"${tenant_id}\" - User not found`);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            this.logger.warn(`Login failed for email \"${email}\" in tenant \"${tenant_id}\" - Invalid password`);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = {
            sub: user.id,
            email: user.email,
            tenant_id: user.tenant_id,
        };
        this.logger.log(`Login successful for user ${user.id} in tenant ${tenant_id}`);
        try {
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
        catch (error) {
            this.logger.error('Falha ao assinar token JWT:', error);
            throw new Error('Erro interno de autenticação - token JWT not configured');
        }
    }
};
exports.AuthService = AuthService;
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "login", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService,
        users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map