import { Test, TestingModule } from '@nestjs/testing';
import { ReservasController } from './reservas.controller';
import { ReservasService } from './reservas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { RifasService } from '../rifas/rifas.service';
import { EmailService } from '../../integrations/email/email.service';
import { WhatsappService } from '../../integrations/whatsapp/whatsapp.service';
import { LoggerService } from '../../common/logger/logger.service';
import { Connection } from 'typeorm';

describe('ReservasController', () => {
  let controller: ReservasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservasController],
      providers: [
        ReservasService,
        {
          provide: getRepositoryToken(Reserva),
          useValue: {},
        },
        {
          provide: RifasService,
          useValue: {},
        },
        {
          provide: EmailService,
          useValue: {},
        },
        {
          provide: WhatsappService,
          useValue: {},
        },
        {
          provide: LoggerService,
          useValue: { log: jest.fn(), error: jest.fn(), warn: jest.fn() },
        },
        { 
          provide: Connection, 
          useValue: { createQueryRunner: jest.fn().mockReturnValue({ connect: jest.fn(), startTransaction: jest.fn(), commitTransaction: jest.fn(), rollbackTransaction: jest.fn(), release: jest.fn(), manager: { save: jest.fn(), findOne: jest.fn() } }) } 
        },
      ],
    }).compile();

    controller = module.get<ReservasController>(ReservasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
