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
const app_controller_1 = __webpack_require__(72);
const app_service_1 = __webpack_require__(73);
const rifas_module_1 = __webpack_require__(43);
const throttler_1 = __webpack_require__(69);
const core_1 = __webpack_require__(1);
const cota_entity_1 = __webpack_require__(15);
const rifa_entity_1 = __webpack_require__(12);
const user_entity_1 = __webpack_require__(10);
const root_user_entity_1 = __webpack_require__(74);
const premio_entity_1 = __webpack_require__(14);
const reserva_entity_1 = __webpack_require__(13);
const pagamento_entity_1 = __webpack_require__(75);
const tenant_entity_1 = __webpack_require__(11);
const tenants_module_1 = __webpack_require__(27);
const subscription_entity_1 = __webpack_require__(16);
const billing_module_1 = __webpack_require__(58);
const logger_module_1 = __webpack_require__(56);
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            throttler_1.ThrottlerModule.forRoot({
                throttlers: [
                    {
                        ttl: 60,
                        limit: 60,
                    },
                ],
            }),
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
                        entities: [
                            cota_entity_1.Cota,
                            rifa_entity_1.Rifa,
                            user_entity_1.User,
                            root_user_entity_1.RootUser,
                            premio_entity_1.Premio,
                            reserva_entity_1.Reserva,
                            pagamento_entity_1.Pagamento,
                            tenant_entity_1.Tenant,
                            subscription_entity_1.Subscription,
                        ],
                        synchronize: false,
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
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
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
const tenants_module_1 = __webpack_require__(27);
const passport_1 = __webpack_require__(26);
const jwt_1 = __webpack_require__(65);
const auth_service_1 = __webpack_require__(66);
const auth_controller_1 = __webpack_require__(67);
const jwt_strategy_1 = __webpack_require__(70);
const roles_guard_1 = __webpack_require__(55);
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            tenants_module_1.TenantsModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET ||
                    (() => {
                        throw new Error('JWT_SECRET não configurado');
                    })(),
                signOptions: {
                    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
                },
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
    (0, typeorm_1.ManyToOne)(() => tenant_entity_1.Tenant, (tenant) => tenant.reservas),
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
const tenants_service_1 = __webpack_require__(28);
const tenants_controller_1 = __webpack_require__(29);
const typeorm_1 = __webpack_require__(4);
const tenant_entity_1 = __webpack_require__(11);
const users_module_1 = __webpack_require__(7);
const platform_express_1 = __webpack_require__(32);
const reservas_module_1 = __webpack_require__(33);
const billing_module_1 = __webpack_require__(58);
let TenantsModule = class TenantsModule {
};
TenantsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([tenant_entity_1.Tenant]),
            users_module_1.UsersModule,
            platform_express_1.MulterModule,
            (0, common_1.forwardRef)(() => reservas_module_1.ReservasModule),
            billing_module_1.BillingModule,
        ],
        controllers: [tenants_controller_1.TenantsController],
        providers: [tenants_service_1.TenantsService],
        exports: [tenants_service_1.TenantsService],
    })
], TenantsModule);
exports.TenantsModule = TenantsModule;


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
    async findByNameOrEmail(identifier) {
        this.logger.log(`Finding tenant by name or email: ${identifier}`);
        const tenant = await this.tenantRepository.findOne({
            where: [{ nome: identifier }, { email: identifier }],
        });
        if (!tenant) {
            this.logger.warn(`Tenant with identifier "${identifier}" not found`);
            throw new common_1.NotFoundException(`Tenant with identifier "${identifier}" not found`);
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantsController = void 0;
const common_1 = __webpack_require__(3);
const tenants_service_1 = __webpack_require__(28);
const create_tenant_dto_1 = __webpack_require__(30);
const update_tenant_dto_1 = __webpack_require__(31);
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
    findByNameOrEmail(identifier) {
        return this.tenantsService.findByNameOrEmail(identifier);
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
    (0, common_1.Get)('identifier/:identifier'),
    __param(0, (0, common_1.Param)('identifier')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "findByNameOrEmail", null);
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
/* 31 */
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
const create_tenant_dto_1 = __webpack_require__(30);
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
/* 32 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 33 */
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
const reservas_service_1 = __webpack_require__(34);
const reservas_controller_1 = __webpack_require__(40);
const typeorm_1 = __webpack_require__(4);
const reserva_entity_1 = __webpack_require__(13);
const tenants_module_1 = __webpack_require__(27);
const rifas_module_1 = __webpack_require__(43);
const integrations_module_1 = __webpack_require__(57);
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
const rifas_service_1 = __webpack_require__(35);
const email_service_1 = __webpack_require__(38);
const whatsapp_service_1 = __webpack_require__(39);
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
/* 35 */
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
const plans_service_1 = __webpack_require__(36);
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
/* 36 */
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
const plan_entity_1 = __webpack_require__(37);
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
    __param(1, (0, typeorm_1.InjectRepository)(plan_entity_1.Plan)),
    __metadata("design:paramtypes", [typeof (_a = typeof logger_service_1.LoggerService !== "undefined" && logger_service_1.LoggerService) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], PlansService);
exports.PlansService = PlansService;


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
/* 38 */
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
/* 39 */
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReservasController = void 0;
const common_1 = __webpack_require__(3);
const reservas_service_1 = __webpack_require__(34);
const create_reserva_dto_1 = __webpack_require__(41);
const update_reserva_dto_1 = __webpack_require__(42);
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
exports.UpdateReservaDto = void 0;
const mapped_types_1 = __webpack_require__(25);
const create_reserva_dto_1 = __webpack_require__(41);
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
/* 43 */
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
const rifas_controller_1 = __webpack_require__(44);
const rifas_service_1 = __webpack_require__(35);
const rifa_entity_1 = __webpack_require__(12);
const cotas_module_1 = __webpack_require__(48);
const plans_module_1 = __webpack_require__(49);
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
/* 44 */
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
const rifas_service_1 = __webpack_require__(35);
const create_rifa_dto_1 = __webpack_require__(45);
const update_rifa_dto_1 = __webpack_require__(46);
const passport_1 = __webpack_require__(26);
const tenant_id_decorator_1 = __webpack_require__(47);
let RifasController = class RifasController {
    constructor(rifasService) {
        this.rifasService = rifasService;
    }
    create(tenantId, createRifaDto) {
        return this.rifasService.create(tenantId, createRifaDto);
    }
    findAll(tenantId) {
        return this.rifasService.findAll(tenantId);
    }
    findOne(tenantId, id) {
        return this.rifasService.findOne(tenantId, id);
    }
    update(tenantId, id, updateRifaDto) {
        return this.rifasService.update(tenantId, id, updateRifaDto);
    }
    remove(tenantId, id) {
        return this.rifasService.remove(tenantId, id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, tenant_id_decorator_1.TenantId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof create_rifa_dto_1.CreateRifaDto !== "undefined" && create_rifa_dto_1.CreateRifaDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], RifasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, tenant_id_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RifasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, tenant_id_decorator_1.TenantId)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RifasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, tenant_id_decorator_1.TenantId)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, typeof (_c = typeof update_rifa_dto_1.UpdateRifaDto !== "undefined" && update_rifa_dto_1.UpdateRifaDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], RifasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, tenant_id_decorator_1.TenantId)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RifasController.prototype, "remove", null);
RifasController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('rifas'),
    __metadata("design:paramtypes", [typeof (_a = typeof rifas_service_1.RifasService !== "undefined" && rifas_service_1.RifasService) === "function" ? _a : Object])
], RifasController);
exports.RifasController = RifasController;


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
exports.UpdateRifaDto = void 0;
const mapped_types_1 = __webpack_require__(25);
const create_rifa_dto_1 = __webpack_require__(45);
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
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantId = void 0;
const common_1 = __webpack_require__(3);
exports.TenantId = (0, common_1.createParamDecorator)((data, ctx) => {
    var _a;
    const request = ctx.switchToHttp().getRequest();
    const tenant_id = (_a = request.user) === null || _a === void 0 ? void 0 : _a.tenant_id;
    if (!tenant_id) {
        throw new common_1.UnauthorizedException('Tenant ID not found in token.');
    }
    return tenant_id;
});


/***/ }),
/* 48 */
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
/* 49 */
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
const plan_entity_1 = __webpack_require__(37);
const plans_service_1 = __webpack_require__(36);
const plans_controller_1 = __webpack_require__(50);
const logger_module_1 = __webpack_require__(56);
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlansController = void 0;
const common_1 = __webpack_require__(3);
const plans_service_1 = __webpack_require__(36);
const create_plan_dto_1 = __webpack_require__(51);
const update_plan_dto_1 = __webpack_require__(52);
const passport_1 = __webpack_require__(26);
const roles_decorator_1 = __webpack_require__(53);
const role_enum_1 = __webpack_require__(54);
const roles_guard_1 = __webpack_require__(55);
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
/* 51 */
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
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(3);
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
var Role;
(function (Role) {
    Role["User"] = "user";
    Role["Admin"] = "admin";
})(Role = exports.Role || (exports.Role = {}));


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(3);
const core_1 = __webpack_require__(1);
const roles_decorator_1 = __webpack_require__(53);
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
        if (!user) {
            return false;
        }
        const userRoles = Array.isArray(user.roles)
            ? user.roles
            : user.role
                ? [user.role]
                : [];
        return requiredRoles.some((role) => userRoles.includes(role));
    }
};
RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);
exports.RolesGuard = RolesGuard;


/***/ }),
/* 56 */
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
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [logger_service_1.LoggerService],
        exports: [logger_service_1.LoggerService],
    })
], LoggerModule);
exports.LoggerModule = LoggerModule;


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
exports.IntegrationsModule = void 0;
const common_1 = __webpack_require__(3);
const email_service_1 = __webpack_require__(38);
const whatsapp_service_1 = __webpack_require__(39);
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
/* 58 */
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
const typeorm_1 = __webpack_require__(4);
const billing_controller_1 = __webpack_require__(59);
const billing_service_1 = __webpack_require__(60);
const subscription_entity_1 = __webpack_require__(16);
const logger_module_1 = __webpack_require__(56);
const webhook_validation_service_1 = __webpack_require__(63);
let BillingModule = class BillingModule {
};
BillingModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([subscription_entity_1.Subscription]), logger_module_1.LoggerModule],
        controllers: [billing_controller_1.BillingController],
        providers: [billing_service_1.BillingService, webhook_validation_service_1.WebhookValidationService],
        exports: [billing_service_1.BillingService],
    })
], BillingModule);
exports.BillingModule = BillingModule;


/***/ }),
/* 59 */
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BillingController = void 0;
const common_1 = __webpack_require__(3);
const billing_service_1 = __webpack_require__(60);
const create_subscription_dto_1 = __webpack_require__(62);
const logger_service_1 = __webpack_require__(18);
const passport_1 = __webpack_require__(26);
const webhook_validation_service_1 = __webpack_require__(63);
let BillingController = class BillingController {
    constructor(logger, billingService, webhookValidationService) {
        this.logger = logger;
        this.billingService = billingService;
        this.webhookValidationService = webhookValidationService;
    }
    createSubscription(createSubscriptionDto) {
        return this.billingService.createSubscription(createSubscriptionDto);
    }
    async webhook(signature, body) {
        const secret = process.env.MP_WEBHOOK_SECRET;
        if (!secret) {
            this.logger.error('MP_WEBHOOK_SECRET não está configurado. Webhook não pode ser validado.');
            throw new common_1.BadRequestException('Webhook secret não configurado');
        }
        if (!signature) {
            this.logger.warn('Assinatura de webhook ausente ao chamar /billing/webhook');
            throw new common_1.UnauthorizedException('Assinatura de webhook ausente');
        }
        const valid = this.webhookValidationService.validate(signature, body, secret);
        if (!valid) {
            this.logger.warn('Assinatura de webhook inválida');
            throw new common_1.UnauthorizedException('Assinatura de webhook inválida');
        }
        this.logger.log(`Webhook de billing recebido e validado: ${JSON.stringify(body)}`);
        return this.billingService.webhook(body);
    }
    getSubscription(id) {
        return this.billingService.getSubscription(id);
    }
};
__decorate([
    (0, common_1.Post)('subscription'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof create_subscription_dto_1.CreateSubscriptionDto !== "undefined" && create_subscription_dto_1.CreateSubscriptionDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "createSubscription", null);
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Headers)('x-signature')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "webhook", null);
__decorate([
    (0, common_1.Get)('subscription/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "getSubscription", null);
BillingController = __decorate([
    (0, common_1.Controller)('billing'),
    __metadata("design:paramtypes", [typeof (_a = typeof logger_service_1.LoggerService !== "undefined" && logger_service_1.LoggerService) === "function" ? _a : Object, typeof (_b = typeof billing_service_1.BillingService !== "undefined" && billing_service_1.BillingService) === "function" ? _b : Object, typeof (_c = typeof webhook_validation_service_1.WebhookValidationService !== "undefined" && webhook_validation_service_1.WebhookValidationService) === "function" ? _c : Object])
], BillingController);
exports.BillingController = BillingController;


/***/ }),
/* 60 */
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
const mercadopago_1 = __webpack_require__(61);
const logger_service_1 = __webpack_require__(18);
let BillingService = class BillingService {
    constructor(logger, subscriptionRepository) {
        this.logger = logger;
        this.subscriptionRepository = subscriptionRepository;
        this.client = new mercadopago_1.MercadoPagoConfig({
            accessToken: process.env.MP_ACCESS_TOKEN,
        });
    }
    async createSubscription(createSubscriptionDto) {
        const appUrl = process.env.APP_URL;
        if (!appUrl) {
            this.logger.error('APP_URL não está configurado. Não é possível criar assinatura.');
            throw new common_1.InternalServerErrorException('Configuração incompleta do serviço de pagamentos.');
        }
        const subscriptionRequest = {
            reason: createSubscriptionDto.reason,
            auto_recurring: {
                frequency: 1,
                frequency_type: 'months',
                transaction_amount: createSubscriptionDto.price,
                currency_id: 'BRL',
            },
            back_url: `${appUrl}/billing/return`,
            payer_email: createSubscriptionDto.payer_email,
            preapproval_plan_id: process.env.MP_PLAN_ID,
        };
        try {
            const preApprovalClient = new mercadopago_1.PreApproval(this.client);
            const response = await preApprovalClient.create({
                body: subscriptionRequest,
            });
            const subscription = this.subscriptionRepository.create({
                id: response.id,
                tenant_id: createSubscriptionDto.tenant_id,
                status: response.status,
            });
            await this.subscriptionRepository.save(subscription);
            return response;
        }
        catch (error) {
            this.logger.error(`Erro ao criar assinatura no Mercado Pago: ${JSON.stringify(error)}`);
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
                    this.logger.warn(`Assinatura com id \"${preapproval.id}\" não encontrada.`);
                }
            }
            catch (error) {
                this.logger.error(`Erro ao processar webhook de preapproval: ${body.data.id}: ${JSON.stringify(error)}`);
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
    __param(1, (0, typeorm_1.InjectRepository)(subscription_entity_1.Subscription)),
    __metadata("design:paramtypes", [typeof (_a = typeof logger_service_1.LoggerService !== "undefined" && logger_service_1.LoggerService) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], BillingService);
exports.BillingService = BillingService;


/***/ }),
/* 61 */
/***/ ((module) => {

module.exports = require("mercadopago");

/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSubscriptionDto = void 0;
class CreateSubscriptionDto {
}
exports.CreateSubscriptionDto = CreateSubscriptionDto;


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhookValidationService = void 0;
const common_1 = __webpack_require__(3);
const crypto = __webpack_require__(64);
let WebhookValidationService = class WebhookValidationService {
    validate(signature, body, secret) {
        const hash = crypto
            .createHmac('sha256', secret)
            .update(JSON.stringify(body))
            .digest('hex');
        return hash === signature;
    }
};
WebhookValidationService = __decorate([
    (0, common_1.Injectable)()
], WebhookValidationService);
exports.WebhookValidationService = WebhookValidationService;


/***/ }),
/* 64 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 65 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(3);
const users_service_1 = __webpack_require__(8);
const tenants_service_1 = __webpack_require__(28);
const jwt_1 = __webpack_require__(65);
const bcrypt = __webpack_require__(17);
const logger_service_1 = __webpack_require__(18);
let AuthService = class AuthService {
    constructor(logger, usersService, tenantsService, jwtService) {
        this.logger = logger;
        this.usersService = usersService;
        this.tenantsService = tenantsService;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        const suppliedTenant = loginDto.tenant_id;
        this.logger.log(`Login attempt for tenant ${suppliedTenant}`);
        if (!suppliedTenant) {
            this.logger.warn('Login attempt without tenant');
            throw new common_1.UnauthorizedException('Tenant não identificado. Informe tenant_id.');
        }
        let tenantId = suppliedTenant;
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        if (!uuidRegex.test(tenantId)) {
            try {
                const tenant = await this.tenantsService.findByNameOrEmail(tenantId);
                tenantId = tenant.id;
            }
            catch (error) {
                this.logger.warn(`Tenant not found using identifier \"${tenantId}\" `, error);
                throw new common_1.UnauthorizedException('Tenant inválido');
            }
        }
        const { email, password } = loginDto;
        try {
            const user = await this.usersService.findByEmail(tenantId, email);
            const isPasswordMatching = await bcrypt.compare(password, user.password);
            if (!isPasswordMatching) {
                this.logger.warn(`Login failed for email \"${email}\" in tenant \"${tenantId}\" - Invalid password`);
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            const payload = {
                sub: user.id,
                email: user.email,
                tenant_id: user.tenant_id,
            };
            this.logger.log(`Login successful for user ${user.id} in tenant ${tenantId}`);
            try {
                return {
                    access_token: this.jwtService.sign(payload),
                };
            }
            catch (error) {
                this.logger.error('JWT signing failed:', error);
                throw new common_1.InternalServerErrorException('Internal authentication error');
            }
        }
        catch (error) {
            this.logger.error('Login error:', error);
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            throw new common_1.InternalServerErrorException('Internal authentication error');
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof logger_service_1.LoggerService !== "undefined" && logger_service_1.LoggerService) === "function" ? _a : Object, typeof (_b = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _b : Object, typeof (_c = typeof tenants_service_1.TenantsService !== "undefined" && tenants_service_1.TenantsService) === "function" ? _c : Object, typeof (_d = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _d : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),
/* 67 */
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
const auth_service_1 = __webpack_require__(66);
const login_dto_1 = __webpack_require__(68);
const throttler_1 = __webpack_require__(69);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto) {
        return this.authService.login(loginDto);
    }
};
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 60000 } }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);
exports.AuthController = AuthController;


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
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDto.prototype, "tenant_id", void 0);
exports.LoginDto = LoginDto;


/***/ }),
/* 69 */
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),
/* 70 */
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
const passport_jwt_1 = __webpack_require__(71);
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
/* 71 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 72 */
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
exports.AppController = void 0;
const common_1 = __webpack_require__(3);
const app_service_1 = __webpack_require__(73);
const express_1 = __webpack_require__(20);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getIndex() {
        return { status: 'ok' };
    }
    getHello(res) {
        const html = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nexus Rifa API</title>
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: #f4f6fb; color: #1f2937; }
      .hero { background: linear-gradient(135deg, #2a61ff, #001f70); color: white; padding: 38px 20px; text-align: center; }
      .container { max-width: 960px; margin: 24px auto; padding: 0 16px; }
      .card { background: white; border-radius: 12px; box-shadow: 0 10px 28px rgba(15, 23, 42, 0.12); padding: 20px; margin-bottom: 16px; }
      .grid { display: grid; grid-gap: 16px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
      h1, h2 { margin: 0; }
      p { color: #475569; }
      a { color: #1d4ed8; text-decoration: none; }
      a:hover { text-decoration: underline; }
      .badge { display: inline-block; background: #e0e7ff; color: #1e3a8a; padding: 4px 10px; border-radius: 999px; font-weight: 600; font-size: 12px; }
      code { background: #e2e8f0; padding: 3px 6px; border-radius: 5px; }
      .footer { text-align: center; padding: 16px; color: #94a3b8; font-size: 13px; }
    </style>
  </head>
  <body>
    <div class="hero">
      <h1>Nexus Rifa API</h1>
      <p>Backend em funcionamento</p>
      <div class="badge">Status: Online</div>
    </div>
    <div class="container">
      <div class="card">
        <h2>Endpoints disponíveis</h2>
        <div class="grid">
          <div>
            <strong>/status-page</strong>
            <p>Página de status</p>
          </div>
          <div>
            <strong>/health</strong>
            <p>Verificação de saúde (JSON)</p>
          </div>
          <div>
            <strong>/status</strong>
            <p>Informações do app (uptime)</p>
          </div>
          <div>
            <strong>/docs</strong>
            <p>Swagger UI para API</p>
          </div>
          <div>
            <strong>/auth/login</strong>
            <p>Login JWT</p>
          </div>
        </div>
      </div>

      <div class="card">
        <h2>Como testar</h2>
        <p>Use suas credenciais de usuário reais ou crie um usuário no banco de dados de teste.</p>
        <p>Não exiba credenciais de contas reais ou de seeds em ambientes públicos.</p>
        <p>Exemplo:</p>
        <code>POST /auth/login</code> com JSON:
        <pre>{"email":"seu-email@example.com","password":"sua-senha","tenant_id":"<tenant-id>"}</pre>
      </div>

      <div class="card">
        <h2>Configuração do frontend</h2>
        <p>Em produção, aponte para a URL do backend real:</p>
        <code>VITE_API_BASE_URL=https://seu-backend.onrender.com</code>
      </div>
    </div>
    <div class="footer">Nexus Rifa &copy; 2026 | backend powered by NestJS</div>
  </body>
</html>`;
        res.contentType('text/html');
        res.send(html);
    }
    getHealth() {
        return { status: 'ok' };
    }
    getStatus() {
        return { app: 'nexus-rifa', uptime: process.uptime() };
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getIndex", null);
__decorate([
    (0, common_1.Get)('status-page'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getHealth", null);
__decorate([
    (0, common_1.Get)('status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getStatus", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),
/* 73 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(3);
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;


/***/ }),
/* 74 */
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
exports.RootUser = void 0;
const typeorm_1 = __webpack_require__(9);
let RootUser = class RootUser {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RootUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', unique: true }),
    __metadata("design:type", String)
], RootUser.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], RootUser.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], RootUser.prototype, "created_at", void 0);
RootUser = __decorate([
    (0, typeorm_1.Entity)('root_users')
], RootUser);
exports.RootUser = RootUser;


/***/ }),
/* 75 */
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
/* 76 */
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),
/* 77 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 78 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 79 */
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
const dotenv_1 = __webpack_require__(76);
const path_1 = __webpack_require__(77);
const swagger_1 = __webpack_require__(78);
const helmet_1 = __webpack_require__(79);
(0, dotenv_1.config)({
    path: (0, path_1.resolve)(__dirname, `../.env.${process.env.NODE_ENV || 'development'}`),
});
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bodyParser: true });
    const allowedOrigins = process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
        : [
            'https://nexus-rifa.onrender.com',
            'https://nexus-rifa-jwi51tf00-adrianoisrael7s-projects.vercel.app',
            'https://nexus-rifa-sigma.vercel.app',
        ];
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin) {
                callback(null, true);
                return;
            }
            if (process.env.CORS_ORIGIN) {
                const allowed = allowedOrigins;
                if (allowed.includes(origin)) {
                    callback(null, true);
                }
                else {
                    callback(new Error(`Origin ${origin} not allowed by CORS`));
                }
                return;
            }
            callback(null, true);
        },
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    app.use((0, helmet_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Nexus Rifa API')
        .setDescription('API for Nexus Rifa application')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    const port = 10000;
    await app.listen(port, '0.0.0.0');
}
bootstrap();

})();

/******/ })()
;