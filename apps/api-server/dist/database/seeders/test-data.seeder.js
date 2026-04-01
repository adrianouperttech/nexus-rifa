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
exports.TestDataSeeder = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const tenant_entity_1 = require("../../modules/tenants/entities/tenant.entity");
const user_entity_1 = require("../../modules/users/entities/user.entity");
const rifa_entity_1 = require("../../modules/rifas/entities/rifa.entity");
const cota_entity_1 = require("../../modules/cotas/entities/cota.entity");
let TestDataSeeder = class TestDataSeeder {
    constructor(tenantRepository, userRepository, rifaRepository, cotaRepository) {
        this.tenantRepository = tenantRepository;
        this.userRepository = userRepository;
        this.rifaRepository = rifaRepository;
        this.cotaRepository = cotaRepository;
    }
    async seed() {
        const tenantEmail = 'teste@tenant.com';
        let tenant = await this.tenantRepository.findOne({
            where: { email: tenantEmail },
        });
        if (!tenant) {
            tenant = this.tenantRepository.create({
                nome: 'Tenant de Teste',
                email: tenantEmail,
                ativo: true,
            });
            tenant = await this.tenantRepository.save(tenant);
            console.log('Tenant de teste criado:', tenant.id);
        }
        else {
            console.log('Tenant de teste já existe:', tenant.id);
        }
        const userEmail = 'admin@teste.com';
        const existingUser = await this.userRepository.findOne({
            where: { email: userEmail, tenant_id: tenant.id },
        });
        if (!existingUser) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash('Pa$$w0rd', salt);
            const user = this.userRepository.create({
                tenant_id: tenant.id,
                nome: 'Administrador Teste',
                email: userEmail,
                password: hashedPassword,
                role: 'admin',
                ativo: true,
            });
            await this.userRepository.save(user);
            console.log('Usuário de teste criado:', userEmail);
        }
        else {
            console.log('Usuário de teste já existe:', userEmail);
        }
        const rifaTitulo = 'Rifa de Teste';
        let rifa = await this.rifaRepository.findOne({
            where: { tenant_id: tenant.id, titulo: rifaTitulo },
        });
        if (!rifa) {
            rifa = this.rifaRepository.create({
                tenant_id: tenant.id,
                titulo: rifaTitulo,
                descricao: 'Rifa gerada para testes automatizados',
                valor_cota: 10,
                min_num: 1,
                max_num: 20,
                chave_pix: '123456789',
                status: 'ativa',
                limite: 20,
                nome: 'Rifa Teste',
            });
            rifa = await this.rifaRepository.save(rifa);
            console.log('Rifa de teste criada:', rifa.id);
        }
        else {
            console.log('Rifa de teste já existe:', rifa.id);
        }
        const existsCotas = await this.cotaRepository.findOne({
            where: { rifa_id: rifa.id },
        });
        if (!existsCotas) {
            const cotas = [];
            for (let i = 1; i <= 20; i++) {
                cotas.push(this.cotaRepository.create({
                    id: i,
                    rifa_id: rifa.id,
                    tenant_id: tenant.id,
                    status: 'livre',
                }));
            }
            await this.cotaRepository.save(cotas);
            console.log('20 cotas de teste inseridas para a rifa:', rifa.id);
        }
        else {
            console.log('Cotas de teste já existem para a rifa:', rifa.id);
        }
        return true;
    }
    async drop() {
        const tenant = await this.tenantRepository.findOne({
            where: { email: 'teste@tenant.com' },
        });
        if (!tenant)
            return;
        await this.cotaRepository.delete({ tenant_id: tenant.id });
        await this.rifaRepository.delete({ tenant_id: tenant.id });
        await this.userRepository.delete({ tenant_id: tenant.id });
        await this.tenantRepository.delete({ id: tenant.id });
    }
};
exports.TestDataSeeder = TestDataSeeder;
exports.TestDataSeeder = TestDataSeeder = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tenant_entity_1.Tenant)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(rifa_entity_1.Rifa)),
    __param(3, (0, typeorm_1.InjectRepository)(cota_entity_1.Cota)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TestDataSeeder);
//# sourceMappingURL=test-data.seeder.js.map