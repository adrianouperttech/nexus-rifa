import { Test, TestingModule } from '@nestjs/testing';
import { ReservasService } from './reservas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { RifasService } from '../rifas/rifas.service';
import { EmailService } from '../../integrations/email/email.service';
import { WhatsappService } from '../../integrations/whatsapp/whatsapp.service';
import { LoggerService } from '../../common/logger/logger.service';
import { ConflictException } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { Connection } from 'typeorm';

const mockQueryRunner = {
  connect: jest.fn(),
  startTransaction: jest.fn(),
  commitTransaction: jest.fn(),
  rollbackTransaction: jest.fn(),
  release: jest.fn(),
  manager: {
    findOne: jest.fn(),
    save: jest.fn(),
  },
};

describe('ReservasService', () => {
  let service: ReservasService;
  let rifasService: RifasService;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockQueryRunner.manager.findOne.mockReset();
    mockQueryRunner.manager.save.mockReset();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservasService,
        { provide: getRepositoryToken(Reserva), useFactory: () => ({ create: jest.fn().mockImplementation((dto) => dto) }) },
        { provide: RifasService, useFactory: () => ({ findOne: jest.fn() }) },
        { provide: EmailService, useValue: { send: jest.fn() } },
        { provide: WhatsappService, useValue: { send: jest.fn() } },
        { provide: LoggerService, useValue: { log: jest.fn(), error: jest.fn() } },
        { provide: Connection, useFactory: () => ({ createQueryRunner: jest.fn(() => mockQueryRunner) }) },
      ],
    }).compile();

    service = module.get<ReservasService>(ReservasService);
    rifasService = module.get<RifasService>(RifasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createReservaDto: CreateReservaDto = { rifa_id: '1', numero: 1, nome: 'test', email: 'test@example.com', whatsapp: '12345' };
    const rifa = { id: '1', limite: 100, nome: 'Test Rifa' };

    it('should throw ConflictException if reserva already exists', async () => {
      jest.spyOn(rifasService, 'findOne').mockResolvedValue(rifa as any);
      mockQueryRunner.manager.findOne.mockResolvedValue({} as any);

      await expect(service.create(createReservaDto, '1')).rejects.toThrow(ConflictException);

      expect(mockQueryRunner.startTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.manager.findOne).toHaveBeenCalled();
      expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.commitTransaction).not.toHaveBeenCalled();
      expect(mockQueryRunner.manager.save).not.toHaveBeenCalled();
    });

    it('should create a reserva successfully', async () => {
      jest.spyOn(rifasService, 'findOne').mockResolvedValue(rifa as any);
      mockQueryRunner.manager.findOne.mockResolvedValue(null);
      mockQueryRunner.manager.save.mockResolvedValue({ ...createReservaDto, id: 'new-id' } as any);

      await service.create(createReservaDto, '1');

      expect(mockQueryRunner.startTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.manager.findOne).toHaveBeenCalled();
      expect(mockQueryRunner.manager.save).toHaveBeenCalled();
      expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.rollbackTransaction).not.toHaveBeenCalled();
    });
  });
});
