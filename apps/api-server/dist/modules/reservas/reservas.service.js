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
exports.ReservasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reserva_entity_1 = require("./entities/reserva.entity");
const rifas_service_1 = require("../rifas/rifas.service");
const email_service_1 = require("../../integrations/email/email.service");
const whatsapp_service_1 = require("../../integrations/whatsapp/whatsapp.service");
const logger_service_1 = require("../../common/logger/logger.service");
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
exports.ReservasService = ReservasService;
exports.ReservasService = ReservasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(logger_service_1.LoggerService)),
    __param(1, (0, typeorm_1.InjectRepository)(reserva_entity_1.Reserva)),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => rifas_service_1.RifasService))),
    __metadata("design:paramtypes", [logger_service_1.LoggerService,
        typeorm_2.Repository,
        typeorm_2.Connection,
        rifas_service_1.RifasService,
        email_service_1.EmailService,
        whatsapp_service_1.WhatsappService])
], ReservasService);
//# sourceMappingURL=reservas.service.js.map