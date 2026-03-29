"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const root_users_module_1 = require("../root-users/root-users.module");
const admin_auth_controller_1 = require("./auth/controllers/admin-auth.controller");
const admin_auth_service_1 = require("./auth/services/admin-auth.service");
const admin_plans_controller_1 = require("./plans/controllers/admin-plans.controller");
const plans_module_1 = require("../plans/plans.module");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            root_users_module_1.RootUsersModule,
            plans_module_1.PlansModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '1h' },
            }),
        ],
        controllers: [admin_auth_controller_1.AdminAuthController, admin_plans_controller_1.AdminPlansController],
        providers: [admin_auth_service_1.AdminAuthService],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map