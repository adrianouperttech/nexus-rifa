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
exports.RootUserSeeder = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const root_user_entity_1 = require("../../modules/root-users/entities/root-user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let RootUserSeeder = class RootUserSeeder {
    constructor(rootUserRepository) {
        this.rootUserRepository = rootUserRepository;
    }
    async seed() {
        const existingUser = await this.rootUserRepository.findOne({ where: { email: 'root@example.com' } });
        if (existingUser) {
            console.log('Root user already exists, skipping seed.');
            return;
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash('root', salt);
        const rootUser = this.rootUserRepository.create({
            email: 'root@example.com',
            password: hashedPassword,
        });
        return this.rootUserRepository.save(rootUser);
    }
    async drop() {
        return this.rootUserRepository.delete({ email: 'root@example.com' });
    }
};
exports.RootUserSeeder = RootUserSeeder;
exports.RootUserSeeder = RootUserSeeder = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(root_user_entity_1.RootUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RootUserSeeder);
//# sourceMappingURL=root-user.seeder.js.map