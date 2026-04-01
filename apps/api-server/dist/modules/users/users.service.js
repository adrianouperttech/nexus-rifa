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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const logger_service_1 = require("../../common/logger/logger.service");
let UsersService = class UsersService {
    constructor(logger, userRepository) {
        this.logger = logger;
        this.userRepository = userRepository;
    }
    async create(tenant_id, createUserDto) {
        this.logger.log(`Creating user for tenant ${tenant_id}`);
        const { password } = createUserDto, userData = __rest(createUserDto, ["password"]);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create(Object.assign(Object.assign({}, userData), { password: hashedPassword, tenant_id }));
        return this.userRepository.save(user);
    }
    async findAll(tenant_id) {
        this.logger.log(`Finding all users for tenant ${tenant_id}`);
        return this.userRepository.find({ where: { tenant_id } });
    }
    async findOne(tenant_id, id) {
        this.logger.log(`Finding user with id ${id} for tenant ${tenant_id}`);
        const user = await this.userRepository.findOneBy({
            id,
            tenant_id,
        });
        if (!user) {
            this.logger.warn(`User with ID "${id}" not found for tenant "${tenant_id}"`);
            throw new common_1.NotFoundException(`User with ID \"${id}\" not found`);
        }
        return user;
    }
    async findByEmail(tenant_id, email) {
        this.logger.log(`Finding user with email ${email} for tenant ${tenant_id}`);
        const user = await this.userRepository.findOneBy({
            email,
            tenant_id,
        });
        if (!user) {
            this.logger.warn(`User with email "${email}" not found for tenant "${tenant_id}"`);
            throw new common_1.NotFoundException(`User with email \"${email}\" not found`);
        }
        return user;
    }
    async update(tenant_id, id, updateUserDto) {
        this.logger.log(`Updating user with id ${id} for tenant ${tenant_id}`);
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        const user = await this.userRepository.preload(Object.assign({ id: id }, updateUserDto));
        if (!user) {
            this.logger.warn(`User with ID "${id}" not found for tenant "${tenant_id}" to update`);
            throw new common_1.NotFoundException(`User with ID \"${id}\" not found`);
        }
        return this.userRepository.save(user);
    }
    async remove(tenant_id, id) {
        this.logger.log(`Removing user with id ${id} for tenant ${tenant_id}`);
        const result = await this.userRepository.delete({ id, tenant_id });
        if (result.affected === 0) {
            this.logger.warn(`User with ID "${id}" not found for tenant "${tenant_id}" to remove`);
            throw new common_1.NotFoundException(`User with ID \"${id}\" not found`);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(logger_service_1.LoggerService)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [logger_service_1.LoggerService,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map