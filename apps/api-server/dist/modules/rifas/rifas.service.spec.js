"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const rifas_service_1 = require("./rifas.service");
const typeorm_1 = require("@nestjs/typeorm");
const rifa_entity_1 = require("./entities/rifa.entity");
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../../common/logger/logger.service");
const plans_service_1 = require("../plans/plans.service");
describe('RifasService', () => {
    let service;
    let repository;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                rifas_service_1.RifasService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(rifa_entity_1.Rifa),
                    useFactory: () => ({
                        find: jest.fn(),
                        findOne: jest.fn(),
                        create: jest.fn(),
                        save: jest.fn(),
                        remove: jest.fn(),
                        count: jest.fn(),
                        delete: jest.fn(),
                    }),
                },
                { provide: plans_service_1.PlansService, useFactory: () => ({ findOne: jest.fn() }) },
                {
                    provide: logger_service_1.LoggerService,
                    useValue: { error: jest.fn(), warn: jest.fn(), log: jest.fn() },
                },
            ],
        }).compile();
        service = module.get(rifas_service_1.RifasService);
        repository = module.get((0, typeorm_1.getRepositoryToken)(rifa_entity_1.Rifa));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should create a rifa', async () => {
            const createRifaDto = { titulo: 'My Rifa' };
            const tenant_id = '1';
            const createdRifa = Object.assign(Object.assign({ id: '1' }, createRifaDto), { tenant_id });
            jest.spyOn(repository, 'create').mockReturnValue(createdRifa);
            jest.spyOn(repository, 'save').mockResolvedValue(createdRifa);
            const result = await service.create(tenant_id, createRifaDto);
            expect(repository.create).toHaveBeenCalledWith(Object.assign(Object.assign({}, createRifaDto), { tenant_id }));
            expect(repository.save).toHaveBeenCalledWith(createdRifa);
            expect(result).toEqual(createdRifa);
        });
    });
    describe('findAll', () => {
        it('should return an array of rifas', async () => {
            const result = [{}];
            jest.spyOn(repository, 'find').mockResolvedValue(result);
            expect(await service.findAll('1')).toBe(result);
        });
    });
    describe('findOne', () => {
        it('should return a rifa', async () => {
            const result = {};
            jest.spyOn(repository, 'findOne').mockResolvedValue(result);
            expect(await service.findOne('1', '1')).toBe(result);
        });
        it('should throw NotFoundException if rifa not found', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);
            await expect(service.findOne('1', '1')).rejects.toThrow(common_1.NotFoundException);
        });
    });
    describe('remove', () => {
        it('should remove a rifa', async () => {
            jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 });
            await service.remove('1', '1');
            expect(repository.delete).toHaveBeenCalledWith({
                id: '1',
                tenant_id: '1',
            });
        });
        it('should throw NotFoundException if rifa is not found', async () => {
            jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 0 });
            await expect(service.remove('1', '1')).rejects.toThrow(common_1.NotFoundException);
        });
    });
});
//# sourceMappingURL=rifas.service.spec.js.map