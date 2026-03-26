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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const nestjs_seeder_1 = require("nestjs-seeder");
const typeorm_1 = require("@nestjs/typeorm");
const root_user_entity_1 = require("../../modules/root-users/entities/root-user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const typeorm_3 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
let RootUserSeeder = class RootUserSeeder {
    rootUserRepository;
    constructor(rootUserRepository) {
        this.rootUserRepository = rootUserRepository;
    }
    async run() {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash('root', salt);
        const rootUser = this.rootUserRepository.create({
            email: 'root@example.com',
            password: hashedPassword,
        });
        await this.rootUserRepository.save(rootUser);
    }
};
RootUserSeeder = __decorate([
    __param(0, (0, typeorm_2.InjectRepository)(root_user_entity_1.RootUser)),
    __metadata("design:paramtypes", [typeorm_3.Repository])
], RootUserSeeder);
(0, nestjs_seeder_1.seeder)({
    imports: [typeorm_1.TypeOrmModule.forFeature([root_user_entity_1.RootUser])],
}).run([RootUserSeeder]);
//# sourceMappingURL=root-user.seeder.js.map