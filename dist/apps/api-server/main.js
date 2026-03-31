/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(4);
const config_1 = __webpack_require__(5);
const auth_module_1 = __webpack_require__(6);
const users_module_1 = __webpack_require__(7);
const rifas_module_1 = __webpack_require__(36);
const throttler_1 = __webpack_require__(31);
const core_1 = __webpack_require__(1);
const cota_entity_1 = __webpack_require__(15);
const rifa_entity_1 = __webpack_require__(12);
const user_entity_1 = __webpack_require__(10);
const premio_entity_1 = __webpack_require__(14);
const reserva_entity_1 = __webpack_require__(13);
const pagamento_entity_1 = __webpack_require__(50);
const tenant_entity_1 = __webpack_require__(11);
const tenants_module_1 = __webpack_require__(51);
const subscription_entity_1 = __webpack_require__(16);
const billing_module_1 = __webpack_require__(65);
const logger_module_1 = __webpack_require__(49);
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            throttler_1.ThrottlerModule.forRoot([{
                    ttl: 60000,
                    limit: 60,
                }]),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const databaseUrl = configService.get('DATABASE_URL');
                    if (!databaseUrl) {
                        throw new Error('A variável de ambiente DATABASE_URL não está definida.');
                    }
                    return {
                        type: 'postgres',
                        url: databaseUrl,
                        entities: [cota_entity_1.Cota, rifa_entity_1.Rifa, user_entity_1.User, premio_entity_1.Premio, reserva_entity_1.Reserva, pagamento_entity_1.Pagamento, tenant_entity_1.Tenant, subscription_entity_1.Subscription],
                        synchronize: true,
                        ssl: {
                            rejectUnauthorized: false,
                        },
                    };
                },
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            rifas_module_1.RifasModule,
            tenants_module_1.TenantsModule,
            billing_module_1.BillingModule,
            logger_module_1.LoggerModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(3);
const users_module_1 = __webpack_require__(7);
const passport_1 = __webpack_require__(26);
const jwt_1 = __webpack_require__(27);
const auth_service_1 = __webpack_require__(28);
const auth_controller_1 = __webpack_require__(30);
const jwt_strategy_1 = __webpack_require__(32);
const roles_guard_1 = __webpack_require__(34);
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '60s' },
            }),
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, roles_guard_1.RolesGuard],
        controllers: [auth_controller_1.AuthController],
        exports: [roles_guard_1.RolesGuard],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(4);
const users_service_1 = __webpack_require__(8);
const users_controller_1 = __webpack_require__(21);
const user_entity_1 = __webpack_require__(10);
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User])],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);
exports.UsersModule = UsersModule;


/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(4);
const typeorm_2 = __webpack_require__(9);
const user_entity_1 = __webpack_require__(10);
const bcrypt = __webpack_require__(17);
const logger_service_1 = __webpack_require__(18);
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
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(logger_service_1.LoggerService)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof logger_service_1.LoggerService !== "undefined" && logger_service_1.LoggerService) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], UsersService);
exports.UsersService = UsersService;


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const typeorm_1 = __webpack_require__(9);
const tenant_entity_1 = __webpack_require__(11);
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], User.prototype, "tenant_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tenant_entity_1.Tenant, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'tenant_id' }),
    __metadata("design:type", typeof (_a = typeof tenant_entity_1.Tenant !== "undefined" && tenant_entity_1.Tenant) === "function" ? _a : Object)
], User.prototype, "tenant", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: 'admin' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "ativo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "created_at", void 0);
User = __decorate([
    (0, typeorm_1.Entity)('users'),
    (0, typeorm_1.Unique)(['tenant_id', 'email'])
], User);
exports.User = User;


/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tenant = void 0;
const typeorm_1 = __webpack_require__(9);
const user_entity_1 = __webpack_require__(10);
const rifa_entity_1 = __webpack_require__(12);
const cota_entity_1 = __webpack_require__(15);
const reserva_entity_1 = __webpack_require__(13);
const subscription_entity_1 = __webpack_require__(16);
let Tenant = class Tenant {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Tenant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Tenant.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Tenant.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Tenant.prototype, "ativo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Tenant.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.tenant),
    __metadata("design:type", Array)
], Tenant.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rifa_entity_1.Rifa, (rifa) => rifa.tenant),
    __metadata("design:type", Array)
], Tenant.prototype, "rifas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cota_entity_1.Cota, (cota) => cota.tenant),
    __metadata("design:type", Array)
], Tenant.prototype, "cotas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reserva_entity_1.Reserva, (reserva) => reserva.tenant),
    __metadata("design:type", Array)
], Tenant.prototype, "reservas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subscription_entity_1.Subscription, (subscription) => subscription.tenant),
    __metadata("design:type", Array)
], Tenant.prototype, "subscriptions", void 0);
Tenant = __decorate([
    (0, typeorm_1.Entity)('tenants')
], Tenant);
exports.Tenant = Tenant;


/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Rifa = void 0;
const typeorm_1 = __webpack_require__(9);
const tenant_entity_1 = __webpack_require__(11);
const reserva_entity_1 = __webpack_require__(13);
const premio_entity_1 = __webpack_require__(14);
let Rifa = class Rifa {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Rifa.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Rifa.prototype, "tenant_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Rifa.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Rifa.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric' }),
    __metadata("design:type", Number)
], Rifa.prototype, "valor_cota", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 1 }),
    __metadata("design:type", Number)
], Rifa.prototype, "min_num", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Rifa.prototype, "max_num", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Rifa.prototype, "chave_pix", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: 'ativa' }),
    __metadata("design:type", String)
], Rifa.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Rifa.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Rifa.prototype, "limite", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Rifa.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tenant_entity_1.Tenant, (tenant) => tenant.rifas),
    (0, typeorm_1.JoinColumn)({ name: 'tenant_id' }),
    __metadata("design:type", typeof (_b = typeof tenant_entity_1.Tenant !== "undefined" && tenant_entity_1.Tenant) === "function" ? _b : Object)
], Rifa.prototype, "tenant", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('Cota', (cota) => cota.rifa),
    __metadata("design:type", Array)
], Rifa.prototype, "cotas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reserva_entity_1.Reserva, (reserva) => reserva.rifa),
    __metadata("design:type", Array)
], Rifa.prototype, "reservas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => premio_entity_1.Premio, (premio) => premio.rifa),
    __metadata("design:type", Array)
], Rifa.prototype, "premios", void 0);
Rifa = __decorate([
    (0, typeorm_1.Entity)('rifas')
], Rifa);
exports.Rifa = Rifa;


/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Reserva = void 0;
const typeorm_1 = __webpack_require__(9);
const tenant_entity_1 = __webpack_require__(11);
const rifa_entity_1 = __webpack_require__(12);
let Reserva = class Reserva {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Reserva.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Reserva.prototype, "tenant_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Reserva.prototype, "rifa_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Reserva.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Reserva.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Reserva.prototype, "whatsapp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Reserva.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: 'reservada' }),
    __metadata("design:type", String)
], Reserva.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Reserva.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tenant_entity_1.Tenant, tenant => tenant.reservas),
    (0, typeorm_1.JoinColumn)({ name: 'tenant_id' }),
    __metadata("design:type", typeof (_b = typeof tenant_entity_1.Tenant !== "undefined" && tenant_entity_1.Tenant) === "function" ? _b : Object)
], Reserva.prototype, "tenant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rifa_entity_1.Rifa, (rifa) => rifa.reservas),
    (0, typeorm_1.JoinColumn)({ name: 'rifa_id' }),
    __metadata("design:type", typeof (_c = typeof rifa_entity_1.Rifa !== "undefined" && rifa_entity_1.Rifa) === "function" ? _c : Object)
], Reserva.prototype, "rifa", void 0);
Reserva = __decorate([
    (0, typeorm_1.Entity)('reservas')
], Reserva);
exports.Reserva = Reserva;


/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Premio = void 0;
const typeorm_1 = __webpack_require__(9);
const rifa_entity_1 = __webpack_require__(12);
let Premio = class Premio {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Premio.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Premio.prototype, "rifa_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Premio.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Premio.prototype, "ordem", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Premio.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rifa_entity_1.Rifa, (rifa) => rifa.premios),
    (0, typeorm_1.JoinColumn)({ name: 'rifa_id' }),
    __metadata("design:type", typeof (_b = typeof rifa_entity_1.Rifa !== "undefined" && rifa_entity_1.Rifa) === "function" ? _b : Object)
], Premio.prototype, "rifa", void 0);
Premio = __decorate([
    (0, typeorm_1.Entity)('premios')
], Premio);
exports.Premio = Premio;


/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Cota = void 0;
const typeorm_1 = __webpack_require__(9);
const rifa_entity_1 = __webpack_require__(12);
const tenant_entity_1 = __webpack_require__(11);
let Cota = class Cota {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'integer' }),
    __metadata("design:type", Number)
], Cota.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'uuid' }),
    __metadata("design:type", String)
], Cota.prototype, "rifa_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Cota.prototype, "tenant_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: 'livre' }),
    __metadata("design:type", String)
], Cota.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Cota.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Cota.prototype, "whatsapp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Cota.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Cota.prototype, "reservado_em", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Cota.prototype, "pago_em", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Rifa', (rifa) => rifa.cotas),
    (0, typeorm_1.JoinColumn)({ name: 'rifa_id' }),
    __metadata("design:type", typeof (_c = typeof rifa_entity_1.Rifa !== "undefined" && rifa_entity_1.Rifa) === "function" ? _c : Object)
], Cota.prototype, "rifa", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tenant_entity_1.Tenant, (tenant) => tenant.cotas),
    (0, typeorm_1.JoinColumn)({ name: 'tenant_id' }),
    __metadata("design:type", typeof (_d = typeof tenant_entity_1.Tenant !== "undefined" && tenant_entity_1.Tenant) === "function" ? _d : Object)
], Cota.prototype, "tenant", void 0);
Cota = __decorate([
    (0, typeorm_1.Entity)('cotas')
], Cota);
exports.Cota = Cota;


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Subscription = void 0;
const typeorm_1 = __webpack_require__(9);
const tenant_entity_1 = __webpack_require__(11);
let Subscription = class Subscription {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Subscription.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Subscription.prototype, "tenant_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Subscription.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tenant_entity_1.Tenant, (tenant) => tenant.subscriptions),
    (0, typeorm_1.JoinColumn)({ name: 'tenant_id' }),
    __metadata("design:type", typeof (_a = typeof tenant_entity_1.Tenant !== "undefined" && tenant_entity_1.Tenant) === "function" ? _a : Object)
], Subscription.prototype, "tenant", void 0);
Subscription = __decorate([
    (0, typeorm_1.Entity)('subscriptions')
], Subscription);
exports.Subscription = Subscription;


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerService = void 0;
const common_1 = __webpack_require__(3);
const winston_1 = __webpack_require__(19);
const express_1 = __webpack_require__(20);
const winstonLogger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: 'error.log', level: 'error' }),
        new winston_1.transports.File({ filename: 'combined.log' }),
    ],
});
let LoggerService = class LoggerService {
    constructor(request) {
        this.request = request;
    }
    setContext(context) {
        this.context = context;
    }
    log(message, context) {
        winstonLogger.log('info', message, { context: this.context || context });
    }
    error(message, trace, context) {
        winstonLogger.error(message, { trace, context: this.context || context });
    }
    warn(message, context) {
        winstonLogger.warn(message, { context: this.context || context });
    }
    debug(message, context) {
        winstonLogger.debug(message, { context: this.context || context });
    }
    verbose(message, context) {
        winstonLogger.verbose(message, { context: this.context || context });
    }
};
LoggerService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, common_1.Inject)('REQUEST')),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object])
], LoggerService);
exports.LoggerService = LoggerService;


/***/ }),
/* 19 */
/***/ ((module) => {

module.exports = require("winston");

/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(3);
const users_service_1 = __webpack_require__(8);
const create_user_dto_1 = __webpack_require__(22);
const update_user_dto_1 = __webpack_require__(24);
const passport_1 = __webpack_require__(26);
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(req, createUserDto) {
        const tenant_id = req.user.tenant_id;
        return this.usersService.create(tenant_id, createUserDto);
    }
    findAll(req) {
        const tenant_id = req.user.tenant_id;
        return this.usersService.findAll(tenant_id);
    }
    findOne(req, id) {
        const tenant_id = req.user.tenant_id;
        return this.usersService.findOne(tenant_id, id);
    }
    update(req, id, updateUserDto) {
        const tenant_id = req.user.tenant_id;
        return this.usersService.update(tenant_id, id, updateUserDto);
    }
    remove(req, id) {
        const tenant_id = req.user.tenant_id;
        return this.usersService.remove(tenant_id, id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, typeof (_c = typeof update_user_dto_1.UpdateUserDto !== "undefined" && update_user_dto_1.UpdateUserDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
UsersController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);
exports.UsersController = UsersController;


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
const class_validator_1 = __webpack_require__(23);
class CreateUserDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "ativo", void 0);
exports.CreateUserDto = CreateUserDto;


/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = void 0;
const mapped_types_1 = __webpack_require__(25);
const create_user_dto_1 = __webpack_require__(22);
const class_validator_1 = __webpack_require__(23);
class UpdateUserDto extends (0, mapped_types_1.PartialType)(create_user_dto_1.CreateUserDto) {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateUserDto.prototype, "ativo", void 0);
exports.UpdateUserDto = UpdateUserDto;


/***/ }),
/* 25 */
/***/ ((module) => {

module.exports = require("@nestjs/mapped-types");

/***/ }),
/* 26 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 27 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(3);
const users_service_1 = __webpack_require__(8);
const jwt_1 = __webpack_require__(27);
const bcrypt = __webpack_require__(17);
const login_dto_1 = __webpack_require__(29);
const express_1 = __webpack_require__(20);
const winston_1 = __webpack_require__(19);
let AuthService = class AuthService {
    constructor(logger, usersService, jwtService) {
        this.logger = logger;
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async login(req, loginDto) {
        const tenant_id = req.subdomains.length > 0 ? req.subdomains[0] : null;
        this.logger.info(`Login attempt for tenant ${tenant_id}`);
        if (!tenant_id) {
            this.logger.warn('Login attempt without tenant');
            throw new common_1.UnauthorizedException('Tenant não identificado.');
        }
        const { email, password } = loginDto;
        const user = await this.usersService.findByEmail(tenant_id, email);
        if (!user) {
            this.logger.warn(`Login failed for email "${email}" in tenant "${tenant_id}" - User not found`);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            this.logger.warn(`Login failed for email "${email}" in tenant "${tenant_id}" - Invalid password`);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = {
            sub: user.id,
            email: user.email,
            tenant_id: user.tenant_id,
        };
        this.logger.info(`Login successful for user ${user.id} in tenant ${tenant_id}`);
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _d : Object, typeof (_e = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AuthService.prototype, "login", null);
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('winston')),
    __metadata("design:paramtypes", [typeof (_a = typeof winston_1.Logger !== "undefined" && winston_1.Logger) === "function" ? _a : Object, typeof (_b = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _b : Object, typeof (_c = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _c : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = void 0;
const class_validator_1 = __webpack_require__(23);
class LoginDto {
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
exports.LoginDto = LoginDto;


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(3);
const auth_service_1 = __webpack_require__(28);
const login_dto_1 = __webpack_require__(29);
const throttler_1 = __webpack_require__(31);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto, req) {
        return this.authService.login(req, loginDto);
    }
};
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 60000 } }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),
/* 31 */
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(3);
const passport_1 = __webpack_require__(26);
const passport_jwt_1 = __webpack_require__(33);
const users_service_1 = __webpack_require__(8);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(usersService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
        this.usersService = usersService;
    }
    async validate(payload) {
        if (!payload.sub || !payload.tenant_id) {
            throw new common_1.UnauthorizedException('Token inválido ou malformado');
        }
        const user = await this.usersService.findOne(payload.tenant_id, payload.sub);
        if (!user) {
            throw new common_1.UnauthorizedException('Usuário não encontrado ou token inválido');
        }
        return user;
    }
};
JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),
/* 33 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(3);
const core_1 = __webpack_require__(1);
const roles_decorator_1 = __webpack_require__(35);
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => { var _a; return (_a = user.roles) === null || _a === void 0 ? void 0 : _a.includes(role); });
    }
};
RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);
exports.RolesGuard = RolesGuard;


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(3);
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RifasModule = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(4);
const rifas_controller_1 = __webpack_require__(37);
const rifas_service_1 = __webpack_require__(38);
const rifa_entity_1 = __webpack_require__(12);
const cotas_module_1 = __webpack_require__(43);
const plans_module_1 = __webpack_require__(44);
let RifasModule = class RifasModule {
};
RifasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([rifa_entity_1.Rifa]), cotas_module_1.CotasModule, plans_module_1.PlansModule],
        controllers: [rifas_controller_1.RifasController],
        providers: [rifas_service_1.RifasService],
        exports: [rifas_service_1.RifasService],
    })
], RifasModule);
exports.RifasModule = RifasModule;


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RifasController = void 0;
const common_1 = __webpack_require__(3);
const rifas_service_1 = __webpack_require__(38);
const create_rifa_dto_1 = __webpack_require__(41);
const update_rifa_dto_1 = __webpack_require__(42);
const passport_1 = __webpack_require__(26);
let RifasController = class RifasController {
    constructor(rifasService) {
        this.rifasService = rifasService;
    }
    create(req, createRifaDto) {
        const tenant_id = req.user.tenant_id;
        return this.rifasService.create(tenant_id, createRifaDto);
    }
    findAll(req) {
        const tenant_id = req.user.tenant_id;
        return this.rifasService.findAll(tenant_id);
    }
    findOne(req, id) {
        const tenant_id = req.user.tenant_id;
        return this.rifasService.findOne(tenant_id, id);
    }
    update(req, id, updateRifaDto) {
        const tenant_id = req.user.tenant_id;
        return this.rifasService.update(tenant_id, id, updateRifaDto);
    }
    remove(req, id) {
        const tenant_id = req.user.tenant_id;
        return this.rifasService.remove(tenant_id, id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof create_rifa_dto_1.CreateRifaDto !== "undefined" && create_rifa_dto_1.CreateRifaDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], RifasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RifasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], RifasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, typeof (_c = typeof update_rifa_dto_1.UpdateRifaDto !== "undefined" && update_rifa_dto_1.UpdateRifaDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], RifasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], RifasController.prototype, "remove", null);
RifasController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('rifas'),
    __metadata("design:paramtypes", [typeof (_a = typeof rifas_service_1.RifasService !== "undefined" && rifas_service_1.RifasService) === "function" ? _a : Object])
], RifasController);
exports.RifasController = RifasController;


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RifasService = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(4);
const typeorm_2 = __webpack_require__(9);
const rifa_entity_1 = __webpack_require__(12);
const plans_service_1 = __webpack_require__(39);
const logger_service_1 = __webpack_require__(18);
let RifasService = class RifasService {
    constructor(logger, rifasRepository, plansService) {
        this.logger = logger;
        this.rifasRepository = rifasRepository;
        this.plansService = plansService;
    }
    async create(tenant_id, createRifaDto) {
        this.logger.log(`Creating Rifa for tenant ${tenant_id}`);
        const rifa = this.rifasRepository.create(Object.assign(Object.assign({}, createRifaDto), { tenant_id }));
        return this.rifasRepository.save(rifa);
    }
    async findAll(tenant_id) {
        this.logger.log(`Finding all Rifas for tenant ${tenant_id}`);
        return this.rifasRepository.find({ where: { tenant_id } });
    }
    async findOne(tenant_id, id) {
        this.logger.log(`Finding Rifa with id ${id} for tenant ${tenant_id}`);
        const rifa = await this.rifasRepository.findOne({
            where: { id, tenant_id },
        });
        if (!rifa) {
            this.logger.warn(`Rifa with ID "${id}" not found for tenant "${tenant_id}"`);
            throw new common_1.NotFoundException(`Rifa with ID \"${id}\" not found`);
        }
        return rifa;
    }
    async update(tenant_id, id, updateRifaDto) {
        this.logger.log(`Updating Rifa with id ${id} for tenant ${tenant_id}`);
        const rifa = await this.rifasRepository.preload(Object.assign({ id: id, tenant_id: tenant_id }, updateRifaDto));
        if (!rifa) {
            this.logger.warn(`Rifa with ID "${id}" not found for tenant "${tenant_id}" to update`);
            throw new common_1.NotFoundException(`Rifa with ID \"${id}\" not found`);
        }
        return this.rifasRepository.save(rifa);
    }
    async remove(tenant_id, id) {
        this.logger.log(`Removing Rifa with id ${id} for tenant ${tenant_id}`);
        const result = await this.rifasRepository.delete({ id, tenant_id });
        if (result.affected === 0) {
            this.logger.warn(`Rifa with ID "${id}" not found for tenant "${tenant_id}" to remove`);
            throw new common_1.NotFoundException(`Rifa with ID \"${id}\" not found`);
        }
    }
};
RifasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(logger_service_1.LoggerService)),
    __param(1, (0, typeorm_1.InjectRepository)(rifa_entity_1.Rifa)),
    __metadata("design:paramtypes", [typeof (_a = typeof logger_service_1.LoggerService !== "undefined" && logger_service_1.LoggerService) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof plans_service_1.PlansService !== "undefined" && plans_service_1.PlansService) === "function" ? _c : Object])
], RifasService);
exports.RifasService = RifasService;


/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlansService = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(4);
const typeorm_2 = __webpack_require__(9);
const plan_entity_1 = __webpack_require__(40);
const logger_service_1 = __webpack_require__(18);
let PlansService = class PlansService {
    constructor(logger, planRepository) {
        this.logger = logger;
        this.planRepository = planRepository;
    }
    async create(createPlanDto) {
        this.logger.log('Creating a new plan');
        const plan = this.planRepository.create(createPlanDto);
        return this.planRepository.save(plan);
    }
    async findAll() {
        this.logger.log('Finding all plans');
        return this.planRepository.find();
    }
    async findOne(id) {
        this.logger.log(`Finding plan with id ${id}`);
        const plan = await this.planRepository.findOne({ where: { id } });
        if (!plan) {
            this.logger.warn(`Plan with ID "${id}" not found`);
            throw new common_1.NotFoundException(`Plan with ID \"${id}\" not found`);
        }
        return plan;
    }
    async update(id, updatePlanDto) {
        this.logger.log(`Updating plan with id ${id}`);
        const plan = await this.planRepository.preload(Object.assign({ id: id }, updatePlanDto));
        if (!plan) {
            this.logger.warn(`Plan with ID "${id}" not found for update`);
            throw new common_1.NotFoundException(`Plan with ID \"${id}\" not found`);
        }
        return this.planRepository.save(plan);
    }
    async remove(id) {
        this.logger.log(`Removing plan with id ${id}`);
        const result = await this.planRepository.delete(id);
        if (result.affected === 0) {
            this.logger.warn(`Plan with ID "${id}" not found for removal`);
            throw new common_1.NotFoundException(`Plan with ID \"${id}\" not found`);
        }
    }
};
PlansService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(logger_service_1.LoggerService)),
    __param(1, (0, typeorm_1.InjectRepository)(plan_entity_1.Plan)),
    __metadata("design:paramtypes", [typeof (_a = typeof logger_service_1.LoggerService !== "undefined" && logger_service_1.LoggerService) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], PlansService);
exports.PlansService = PlansService;


/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Plan = void 0;
const typeorm_1 = __webpack_require__(9);
let Plan = class Plan {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Plan.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Plan.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric' }),
    __metadata("design:type", Number)
], Plan.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Plan.prototype, "limit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Plan.prototype, "mercadopago_plan_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Plan.prototype, "created_at", void 0);
Plan = __decorate([
    (0, typeorm_1.Entity)('plans')
], Plan);
exports.Plan = Plan;


/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateRifaDto = void 0;
const class_validator_1 = __webpack_require__(23);
class CreateRifaDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRifaDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRifaDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateRifaDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateRifaDto.prototype, "limit", void 0);
exports.CreateRifaDto = CreateRifaDto;


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateRifaDto = void 0;
const mapped_types_1 = __webpack_require__(25);
const create_rifa_dto_1 = __webpack_require__(41);
const class_validator_1 = __webpack_require__(23);
class UpdateRifaDto extends (0, mapped_types_1.PartialType)(create_rifa_dto_1.CreateRifaDto) {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRifaDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRifaDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateRifaDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateRifaDto.prototype, "limit", void 0);
exports.UpdateRifaDto = UpdateRifaDto;


/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CotasModule = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(4);
const cota_entity_1 = __webpack_require__(15);
let CotasModule = class CotasModule {
};
CotasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([cota_entity_1.Cota])],
        controllers: [],
        providers: [],
    })
], CotasModule);
exports.CotasModule = CotasModule;


/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlansModule = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(4);
const plan_entity_1 = __webpack_require__(40);
const plans_service_1 = __webpack_require__(39);
const plans_controller_1 = __webpack_require__(45);
const logger_module_1 = __webpack_require__(49);
let PlansModule = class PlansModule {
};
PlansModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([plan_entity_1.Plan]), logger_module_1.LoggerModule],
        providers: [plans_service_1.PlansService],
        controllers: [plans_controller_1.PlansController],
        exports: [plans_service_1.PlansService],
    })
], PlansModule);
exports.PlansModule = PlansModule;


/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlansController = void 0;
const common_1 = __webpack_require__(3);
const plans_service_1 = __webpack_require__(39);
const create_plan_dto_1 = __webpack_require__(46);
const update_plan_dto_1 = __webpack_require__(47);
const passport_1 = __webpack_require__(26);
const roles_decorator_1 = __webpack_require__(35);
const role_enum_1 = __webpack_require__(48);
const roles_guard_1 = __webpack_require__(34);
let PlansController = class PlansController {
    constructor(plansService) {
        this.plansService = plansService;
    }
    create(createPlanDto) {
        return this.plansService.create(createPlanDto);
    }
    findAll() {
        return this.plansService.findAll();
    }
    findOne(id) {
        return this.plansService.findOne(id);
    }
    update(id, updatePlanDto) {
        return this.plansService.update(id, updatePlanDto);
    }
    remove(id) {
        return this.plansService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_plan_dto_1.CreatePlanDto !== "undefined" && create_plan_dto_1.CreatePlanDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], PlansController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlansController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlansController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_plan_dto_1.UpdatePlanDto !== "undefined" && update_plan_dto_1.UpdatePlanDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], PlansController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlansController.prototype, "remove", null);
PlansController = __decorate([
    (0, common_1.Controller)('plans'),
    __metadata("design:paramtypes", [typeof (_a = typeof plans_service_1.PlansService !== "undefined" && plans_service_1.PlansService) === "function" ? _a : Object])
], PlansController);
exports.PlansController = PlansController;


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePlanDto = void 0;
const class_validator_1 = __webpack_require__(23);
class CreatePlanDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreatePlanDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreatePlanDto.prototype, "limit", void 0);
exports.CreatePlanDto = CreatePlanDto;


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePlanDto = void 0;
const class_validator_1 = __webpack_require__(23);
class UpdatePlanDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePlanDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePlanDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePlanDto.prototype, "limit", void 0);
exports.UpdatePlanDto = UpdatePlanDto;


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
var Role;
(function (Role) {
    Role["User"] = "user";
    Role["Admin"] = "admin";
})(Role = exports.Role || (exports.Role = {}));


/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerModule = void 0;
const common_1 = __webpack_require__(3);
const logger_service_1 = __webpack_require__(18);
let LoggerModule = class LoggerModule {
};
LoggerModule = __decorate([
    (0, common_1.Module)({
        providers: [logger_service_1.LoggerService],
        exports: [logger_service_1.LoggerService],
    })
], LoggerModule);
exports.LoggerModule = LoggerModule;


/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Pagamento = void 0;
const typeorm_1 = __webpack_require__(9);
const reserva_entity_1 = __webpack_require__(13);
let Pagamento = class Pagamento {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Pagamento.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pagamento.prototype, "reserva_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => reserva_entity_1.Reserva),
    (0, typeorm_1.JoinColumn)({ name: 'reserva_id' }),
    __metadata("design:type", typeof (_a = typeof reserva_entity_1.Reserva !== "undefined" && reserva_entity_1.Reserva) === "function" ? _a : Object)
], Pagamento.prototype, "reserva", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pagamento.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Pagamento.prototype, "gateway_pagamento", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Pagamento.prototype, "transacao_id", void 0);
Pagamento = __decorate([
    (0, typeorm_1.Entity)('pagamentos')
], Pagamento);
exports.Pagamento = Pagamento;


/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantsModule = void 0;
const common_1 = __webpack_require__(3);
const tenants_service_1 = __webpack_require__(52);
const tenants_controller_1 = __webpack_require__(53);
const typeorm_1 = __webpack_require__(4);
const tenant_entity_1 = __webpack_require__(11);
const users_module_1 = __webpack_require__(7);
const platform_express_1 = __webpack_require__(56);
const reservas_module_1 = __webpack_require__(57);
const billing_module_1 = __webpack_require__(65);
let TenantsModule = class TenantsModule {
};
TenantsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tenant_entity_1.Tenant]), users_module_1.UsersModule, platform_express_1.MulterModule, (0, common_1.forwardRef)(() => reservas_module_1.ReservasModule), billing_module_1.BillingModule],
        controllers: [tenants_controller_1.TenantsController],
        providers: [tenants_service_1.TenantsService],
        exports: [tenants_service_1.TenantsService],
    })
], TenantsModule);
exports.TenantsModule = TenantsModule;


/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantsService = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(4);
const typeorm_2 = __webpack_require__(9);
const tenant_entity_1 = __webpack_require__(11);
const logger_service_1 = __webpack_require__(18);
let TenantsService = class TenantsService {
    constructor(logger, tenantRepository) {
        this.logger = logger;
        this.tenantRepository = tenantRepository;
    }
    async create(createTenantDto) {
        this.logger.log('Creating a new tenant');
        const tenant = this.tenantRepository.create(createTenantDto);
        return this.tenantRepository.save(tenant);
    }
    async findAll() {
        this.logger.log('Finding all tenants');
        return this.tenantRepository.find();
    }
    async findOne(id) {
        this.logger.log(`Finding tenant with id ${id}`);
        const tenant = await this.tenantRepository.findOne({ where: { id } });
        if (!tenant) {
            this.logger.warn(`Tenant with ID "${id}" not found`);
            throw new common_1.NotFoundException(`Tenant with ID \"${id}\" not found`);
        }
        return tenant;
    }
    async findByEmail(email) {
        this.logger.log(`Finding tenant with email ${email}`);
        const tenant = await this.tenantRepository.findOne({ where: { email } });
        if (!tenant) {
            this.logger.warn(`Tenant with email "${email}" not found`);
            throw new common_1.NotFoundException(`Tenant with email \"${email}\" not found`);
        }
        return tenant;
    }
    async update(id, updateTenantDto) {
        this.logger.log(`Updating tenant with id ${id}`);
        const tenant = await this.tenantRepository.preload(Object.assign({ id: id }, updateTenantDto));
        if (!tenant) {
            this.logger.warn(`Tenant with ID "${id}" not found for update`);
            throw new common_1.NotFoundException(`Tenant with ID \"${id}\" not found`);
        }
        return this.tenantRepository.save(tenant);
    }
    async remove(id) {
        this.logger.log(`Removing tenant with id ${id}`);
        const result = await this.tenantRepository.delete(id);
        if (result.affected === 0) {
            this.logger.warn(`Tenant with ID "${id}" not found for removal`);
            throw new common_1.NotFoundException(`Tenant with ID \"${id}\" not found`);
        }
    }
};
TenantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(logger_service_1.LoggerService)),
    __param(1, (0, typeorm_1.InjectRepository)(tenant_entity_1.Tenant)),
    __metadata("design:paramtypes", [typeof (_a = typeof logger_service_1.LoggerService !== "undefined" && logger_service_1.LoggerService) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], TenantsService);
exports.TenantsService = TenantsService;


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantsController = void 0;
const common_1 = __webpack_require__(3);
const tenants_service_1 = __webpack_require__(52);
const create_tenant_dto_1 = __webpack_require__(54);
const update_tenant_dto_1 = __webpack_require__(55);
let TenantsController = class TenantsController {
    constructor(tenantsService) {
        this.tenantsService = tenantsService;
    }
    create(createTenantDto) {
        return this.tenantsService.create(createTenantDto);
    }
    findAll() {
        return this.tenantsService.findAll();
    }
    findOne(id) {
        return this.tenantsService.findOne(id);
    }
    findByEmail(email) {
        return this.tenantsService.findByEmail(email);
    }
    update(id, updateTenantDto) {
        return this.tenantsService.update(id, updateTenantDto);
    }
    remove(id) {
        return this.tenantsService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_tenant_dto_1.CreateTenantDto !== "undefined" && create_tenant_dto_1.CreateTenantDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('email/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "findByEmail", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_tenant_dto_1.UpdateTenantDto !== "undefined" && update_tenant_dto_1.UpdateTenantDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "remove", null);
TenantsController = __decorate([
    (0, common_1.Controller)('tenants'),
    __metadata("design:paramtypes", [typeof (_a = typeof tenants_service_1.TenantsService !== "undefined" && tenants_service_1.TenantsService) === "function" ? _a : Object])
], TenantsController);
exports.TenantsController = TenantsController;


/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateTenantDto = void 0;
const class_validator_1 = __webpack_require__(23);
class CreateTenantDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTenantDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTenantDto.prototype, "email", void 0);
exports.CreateTenantDto = CreateTenantDto;


/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateTenantDto = void 0;
const mapped_types_1 = __webpack_require__(25);
const create_tenant_dto_1 = __webpack_require__(54);
const class_validator_1 = __webpack_require__(23);
class UpdateTenantDto extends (0, mapped_types_1.PartialType)(create_tenant_dto_1.CreateTenantDto) {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTenantDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTenantDto.prototype, "email", void 0);
exports.UpdateTenantDto = UpdateTenantDto;


/***/ }),
/* 56 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReservasModule = void 0;
const common_1 = __webpack_require__(3);
const reservas_service_1 = __webpack_require__(58);
const reservas_controller_1 = __webpack_require__(61);
const typeorm_1 = __webpack_require__(4);
const reserva_entity_1 = __webpack_require__(13);
const tenants_module_1 = __webpack_require__(51);
const rifas_module_1 = __webpack_require__(36);
const integrations_module_1 = __webpack_require__(64);
let ReservasModule = class ReservasModule {
};
ReservasModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([reserva_entity_1.Reserva]),
            (0, common_1.forwardRef)(() => tenants_module_1.TenantsModule),
            (0, common_1.forwardRef)(() => rifas_module_1.RifasModule),
            integrations_module_1.IntegrationsModule,
        ],
        controllers: [reservas_controller_1.ReservasController],
        providers: [reservas_service_1.ReservasService],
        exports: [reservas_service_1.ReservasService],
    })
], ReservasModule);
exports.ReservasModule = ReservasModule;


/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReservasService = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(4);
const typeorm_2 = __webpack_require__(9);
const reserva_entity_1 = __webpack_require__(13);
const rifas_service_1 = __webpack_require__(38);
const email_service_1 = __webpack_require__(59);
const whatsapp_service_1 = __webpack_require__(60);
const logger_service_1 = __webpack_require__(18);
let ReservasService = class ReservasService {
    constructor(logger, reservaRepository, connection, rifasService, emailService, whatsappService) {
        this.logger = logger;
        this.reservaRepository = reservaRepository;
        this.connection = connection;
        this.rifasService = rifasService;
        this.emailService = emailService;
        this.whatsappService = whatsappService;
    }
    async create(createReservaDto, tenant_id) {
        const { rifa_id, numero, email, whatsapp } = createReservaDto;
        this.logger.log(`Creating reservation for Rifa ${rifa_id}, number ${numero}, tenant ${tenant_id}`);
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const rifa = await this.rifasService.findOne(tenant_id, rifa_id);
            if (numero > rifa.limite) {
                throw new common_1.ConflictException(`O número ${numero} está acima do limite de ${rifa.limite} da rifa.`);
            }
            const existingReserva = await queryRunner.manager.findOne(reserva_entity_1.Reserva, {
                where: { rifa_id, numero },
                lock: { mode: 'pessimistic_write' },
            });
            if (existingReserva) {
                throw new common_1.ConflictException(`O número ${numero} já está reservado para esta rifa.`);
            }
            const reserva = this.reservaRepository.create(Object.assign(Object.assign({}, createReservaDto), { tenant_id, status: 'disponivel' }));
            const savedReserva = await queryRunner.manager.save(reserva);
            await this.emailService.send(email, `Sua reserva para a rifa ${rifa.nome}, número ${numero} foi realizada com sucesso!`);
            await this.whatsappService.send(whatsapp, `Sua reserva para a rifa ${rifa.nome}, número ${numero} foi realizada com sucesso!`);
            await queryRunner.commitTransaction();
            this.logger.log(`Reservation created successfully for Rifa ${rifa_id}, number ${numero}`);
            return savedReserva;
        }
        catch (err) {
            this.logger.error(`Error creating reservation: ${err}`);
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll(tenant_id) {
        this.logger.log(`Finding all reservations for tenant ${tenant_id}`);
        return this.reservaRepository.find({
            where: { tenant_id },
            relations: ['rifa'],
        });
    }
    async findOne(tenant_id, id) {
        this.logger.log(`Finding reservation with id ${id} for tenant ${tenant_id}`);
        const reserva = await this.reservaRepository.findOne({
            where: { id, tenant_id },
            relations: ['rifa'],
        });
        if (!reserva) {
            this.logger.warn(`Reservation with ID "${id}" not found for tenant "${tenant_id}"`);
            throw new common_1.NotFoundException(`Reserva with ID \"${id}\" not found`);
        }
        return reserva;
    }
    async update(tenant_id, id, updateReservaDto) {
        this.logger.log(`Updating reservation with id ${id} for tenant ${tenant_id}`);
        const reserva = await this.reservaRepository.preload(Object.assign({ id: id, tenant_id: tenant_id }, updateReservaDto));
        if (!reserva) {
            this.logger.warn(`Reservation with ID "${id}" not found for tenant "${tenant_id}" to update`);
            throw new common_1.NotFoundException(`Reserva with ID \"${id}\" not found`);
        }
        return this.reservaRepository.save(reserva);
    }
    async remove(tenant_id, id) {
        this.logger.log(`Removing reservation with id ${id} for tenant ${tenant_id}`);
        const result = await this.reservaRepository.delete({ id, tenant_id });
        if (result.affected === 0) {
            this.logger.warn(`Reservation with ID "${id}" not found for tenant "${tenant_id}" to remove`);
            throw new common_1.NotFoundException(`Reserva with ID \"${id}\" not found`);
        }
    }
    async findByStatus(tenant_id, status) {
        this.logger.log(`Finding reservations with status ${status} for tenant ${tenant_id}`);
        return this.reservaRepository.find({ where: { tenant_id, status } });
    }
    async updateStatus(tenant_id, id, status) {
        this.logger.log(`Updating status of reservation with id ${id} to ${status} for tenant ${tenant_id}`);
        const reserva = await this.findOne(tenant_id, id);
        reserva.status = status;
        return this.reservaRepository.save(reserva);
    }
};
ReservasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(logger_service_1.LoggerService)),
    __param(1, (0, typeorm_1.InjectRepository)(reserva_entity_1.Reserva)),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => rifas_service_1.RifasService))),
    __metadata("design:paramtypes", [typeof (_a = typeof logger_service_1.LoggerService !== "undefined" && logger_service_1.LoggerService) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Connection !== "undefined" && typeorm_2.Connection) === "function" ? _c : Object, typeof (_d = typeof rifas_service_1.RifasService !== "undefined" && rifas_service_1.RifasService) === "function" ? _d : Object, typeof (_e = typeof email_service_1.EmailService !== "undefined" && email_service_1.EmailService) === "function" ? _e : Object, typeof (_f = typeof whatsapp_service_1.WhatsappService !== "undefined" && whatsapp_service_1.WhatsappService) === "function" ? _f : Object])
], ReservasService);
exports.ReservasService = ReservasService;


/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmailService = void 0;
const common_1 = __webpack_require__(3);
let EmailService = class EmailService {
    send(to, subject) {
        console.log(`Sending email to ${to}: ${subject}`);
    }
};
EmailService = __decorate([
    (0, common_1.Injectable)()
], EmailService);
exports.EmailService = EmailService;


/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WhatsappService = void 0;
const common_1 = __webpack_require__(3);
let WhatsappService = class WhatsappService {
    send(to, message) {
        console.log(`Sending WhatsApp message to ${to}: ${message}`);
    }
};
WhatsappService = __decorate([
    (0, common_1.Injectable)()
], WhatsappService);
exports.WhatsappService = WhatsappService;


/***/ }),
/* 61 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReservasController = void 0;
const common_1 = __webpack_require__(3);
const reservas_service_1 = __webpack_require__(58);
const create_reserva_dto_1 = __webpack_require__(62);
const update_reserva_dto_1 = __webpack_require__(63);
const passport_1 = __webpack_require__(26);
let ReservasController = class ReservasController {
    constructor(reservasService) {
        this.reservasService = reservasService;
    }
    create(createReservaDto, req) {
        const tenant_id = req.user.tenant_id;
        return this.reservasService.create(createReservaDto, tenant_id);
    }
    findAll(req) {
        const tenant_id = req.user.tenant_id;
        return this.reservasService.findAll(tenant_id);
    }
    findOne(id, req) {
        const tenant_id = req.user.tenant_id;
        return this.reservasService.findOne(tenant_id, id);
    }
    update(id, updateReservaDto, req) {
        const tenant_id = req.user.tenant_id;
        return this.reservasService.update(tenant_id, id, updateReservaDto);
    }
    remove(id, req) {
        const tenant_id = req.user.tenant_id;
        return this.reservasService.remove(tenant_id, id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_reserva_dto_1.CreateReservaDto !== "undefined" && create_reserva_dto_1.CreateReservaDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], ReservasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReservasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ReservasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_reserva_dto_1.UpdateReservaDto !== "undefined" && update_reserva_dto_1.UpdateReservaDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], ReservasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ReservasController.prototype, "remove", null);
ReservasController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('reservas'),
    __metadata("design:paramtypes", [typeof (_a = typeof reservas_service_1.ReservasService !== "undefined" && reservas_service_1.ReservasService) === "function" ? _a : Object])
], ReservasController);
exports.ReservasController = ReservasController;


/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateReservaDto = void 0;
const class_validator_1 = __webpack_require__(23);
class CreateReservaDto {
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReservaDto.prototype, "rifa_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateReservaDto.prototype, "numero", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReservaDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReservaDto.prototype, "whatsapp", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReservaDto.prototype, "email", void 0);
exports.CreateReservaDto = CreateReservaDto;


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateReservaDto = void 0;
const mapped_types_1 = __webpack_require__(25);
const create_reserva_dto_1 = __webpack_require__(62);
const class_validator_1 = __webpack_require__(23);
class UpdateReservaDto extends (0, mapped_types_1.PartialType)(create_reserva_dto_1.CreateReservaDto) {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReservaDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReservaDto.prototype, "whatsapp", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReservaDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReservaDto.prototype, "status", void 0);
exports.UpdateReservaDto = UpdateReservaDto;


/***/ }),
/* 64 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IntegrationsModule = void 0;
const common_1 = __webpack_require__(3);
const email_service_1 = __webpack_require__(59);
const whatsapp_service_1 = __webpack_require__(60);
let IntegrationsModule = class IntegrationsModule {
};
IntegrationsModule = __decorate([
    (0, common_1.Module)({
        providers: [email_service_1.EmailService, whatsapp_service_1.WhatsappService],
        exports: [email_service_1.EmailService, whatsapp_service_1.WhatsappService],
    })
], IntegrationsModule);
exports.IntegrationsModule = IntegrationsModule;


/***/ }),
/* 65 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BillingModule = void 0;
const common_1 = __webpack_require__(3);
const billing_service_1 = __webpack_require__(66);
const billing_controller_1 = __webpack_require__(68);
const typeorm_1 = __webpack_require__(4);
const subscription_entity_1 = __webpack_require__(16);
const logger_module_1 = __webpack_require__(49);
let BillingModule = class BillingModule {
};
BillingModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([subscription_entity_1.Subscription]), logger_module_1.LoggerModule],
        controllers: [billing_controller_1.BillingController],
        providers: [billing_service_1.BillingService],
        exports: [billing_service_1.BillingService],
    })
], BillingModule);
exports.BillingModule = BillingModule;


/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BillingService = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(4);
const typeorm_2 = __webpack_require__(9);
const subscription_entity_1 = __webpack_require__(16);
const mercadopago_1 = __webpack_require__(67);
const winston_1 = __webpack_require__(19);
let BillingService = class BillingService {
    constructor(logger, subscriptionRepository) {
        this.logger = logger;
        this.subscriptionRepository = subscriptionRepository;
        this.client = new mercadopago_1.MercadoPagoConfig({
            accessToken: process.env.MP_ACCESS_TOKEN,
        });
    }
    async createSubscription(createSubscriptionDto) {
        const subscriptionRequest = {
            reason: createSubscriptionDto.reason,
            auto_recurring: {
                frequency: 1,
                frequency_type: 'months',
                transaction_amount: createSubscriptionDto.price,
                currency_id: 'BRL',
            },
            back_url: 'https://www.google.com',
            payer_email: createSubscriptionDto.payer_email,
            preapproval_plan_id: process.env.MP_PLAN_ID,
        };
        try {
            const preApprovalClient = new mercadopago_1.PreApproval(this.client);
            const response = await preApprovalClient.create({ body: subscriptionRequest });
            const subscription = this.subscriptionRepository.create({
                id: response.id,
                tenant_id: createSubscriptionDto.tenant_id,
                status: response.status,
            });
            await this.subscriptionRepository.save(subscription);
            return response;
        }
        catch (error) {
            this.logger.error('Erro ao criar assinatura no Mercado Pago:', { error });
            throw new common_1.InternalServerErrorException('Falha ao se comunicar com o gateway de pagamento.');
        }
    }
    async webhook(body) {
        if (body.type === 'preapproval') {
            try {
                const preApprovalClient = new mercadopago_1.PreApproval(this.client);
                const preapproval = await preApprovalClient.get({ id: body.data.id });
                const subscription = await this.subscriptionRepository.findOne({
                    where: { id: preapproval.id },
                });
                if (subscription) {
                    subscription.status = preapproval.status;
                    await this.subscriptionRepository.save(subscription);
                }
                else {
                    this.logger.warn(`Assinatura com id "${preapproval.id}" não encontrada.`);
                }
            }
            catch (error) {
                this.logger.error(`Erro ao processar webhook de preapproval: ${body.data.id}`, { error });
                throw new common_1.InternalServerErrorException('Erro ao consultar status da assinatura no gateway.');
            }
        }
        return { message: 'ok' };
    }
    async getSubscription(id) {
        return this.subscriptionRepository.findOne({ where: { id } });
    }
};
BillingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('winston')),
    __param(1, (0, typeorm_1.InjectRepository)(subscription_entity_1.Subscription)),
    __metadata("design:paramtypes", [typeof (_a = typeof winston_1.Logger !== "undefined" && winston_1.Logger) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], BillingService);
exports.BillingService = BillingService;


/***/ }),
/* 67 */
/***/ ((module) => {

module.exports = require("mercadopago");

/***/ }),
/* 68 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BillingController = void 0;
const common_1 = __webpack_require__(3);
const billing_service_1 = __webpack_require__(66);
const create_subscription_dto_1 = __webpack_require__(69);
const winston_1 = __webpack_require__(19);
let BillingController = class BillingController {
    constructor(logger, billingService) {
        this.logger = logger;
        this.billingService = billingService;
    }
    createSubscription(createSubscriptionDto) {
        return this.billingService.createSubscription(createSubscriptionDto);
    }
    webhook(body) {
        this.logger.info('Webhook de billing recebido:', { body });
        return this.billingService.webhook(body);
    }
    getSubscription(id) {
        return this.billingService.getSubscription(id);
    }
};
__decorate([
    (0, common_1.Post)('subscription'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_subscription_dto_1.CreateSubscriptionDto !== "undefined" && create_subscription_dto_1.CreateSubscriptionDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "createSubscription", null);
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "webhook", null);
__decorate([
    (0, common_1.Get)('subscription/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "getSubscription", null);
BillingController = __decorate([
    (0, common_1.Controller)('billing'),
    __param(0, (0, common_1.Inject)('winston')),
    __metadata("design:paramtypes", [typeof (_a = typeof winston_1.Logger !== "undefined" && winston_1.Logger) === "function" ? _a : Object, typeof (_b = typeof billing_service_1.BillingService !== "undefined" && billing_service_1.BillingService) === "function" ? _b : Object])
], BillingController);
exports.BillingController = BillingController;


/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSubscriptionDto = void 0;
class CreateSubscriptionDto {
}
exports.CreateSubscriptionDto = CreateSubscriptionDto;


/***/ }),
/* 70 */
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),
/* 71 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 72 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 73 */
/***/ ((module) => {

module.exports = require("helmet");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const common_1 = __webpack_require__(3);
const dotenv_1 = __webpack_require__(70);
const path_1 = __webpack_require__(71);
const swagger_1 = __webpack_require__(72);
const helmet_1 = __webpack_require__(73);
(0, dotenv_1.config)({ path: (0, path_1.resolve)(__dirname, `../.env.${process.env.NODE_ENV || 'development'}`) });
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bodyParser: true });
    app.use((0, helmet_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Nexus Rifa API')
        .setDescription('API for Nexus Rifa application')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(process.env.PORT || 3000);
}
bootstrap();

})();

/******/ })()
;