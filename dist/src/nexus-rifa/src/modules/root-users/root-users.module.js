"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootUsersModule = void 0;
const common_1 = require("@nestjs/common");
const root_users_controller_1 = require("./root-users.controller");
const root_users_service_1 = require("./root-users.service");
let RootUsersModule = class RootUsersModule {
};
exports.RootUsersModule = RootUsersModule;
exports.RootUsersModule = RootUsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [root_users_controller_1.RootUsersController],
        providers: [root_users_service_1.RootUsersService]
    })
], RootUsersModule);
//# sourceMappingURL=root-users.module.js.map