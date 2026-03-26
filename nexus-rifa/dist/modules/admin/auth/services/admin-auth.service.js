"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const root_users_service_1 = require("../../root-users/root-users.service");
let AdminAuthService = class AdminAuthService {
    rootUsersService;
    jwtService;
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
    __metadata("design:paramtypes", [typeof (_a = typeof root_users_service_1.RootUsersService !== "undefined" && root_users_service_1.RootUsersService) === "function" ? _a : Object, jwt_1.JwtService])
], AdminAuthService);
exports.AdminAuthService = AdminAuthService;
//# sourceMappingURL=admin-auth.service.js.map