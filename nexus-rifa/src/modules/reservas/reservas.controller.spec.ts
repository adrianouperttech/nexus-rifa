import { Test, TestingModule } from '@nestjs/testing';
import { ReservasController } from './reservas.controller';
import { ReservasService } from './reservas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { RifasService } from '../rifas/rifas.service';
import { EmailService } from '../../integrations/email/email.service';
import { WhatsappService } from '../../integrations/whatsapp/whatsapp.service';

describe('ReservasController', () => {
  let controller: ReservasController;

  // Mock para o repositório
  const mockReservaRepository = {
    // adicione aqui métodos mockados se seus testes os chamarem
  };

  // Mock para os serviços
  const mockRifasService = {
    // adicione aqui métodos mockados se seus testes os chamarem
  };
  const mockEmailService = {
    // adicione aqui métodos mockados se seus testes os chamarem
  };
  const mockWhatsappService = {
    // adicione aqui métodos mockados se seus testes os chamarem
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservasController],
      providers: [
        ReservasService, // O serviço real
        // Fornecendo mocks para TODAS as dependências do ReservasService
        {
          provide: getRepositoryToken(Reserva),
          useValue: mockReservaRepository,
        },
        {
          provide: RifasService,
          useValue: mockRifasService,
        },
        {
          provide: EmailService,
          useValue: mockEmailService,
        },
        {
          provide: WhatsappService,
          useValue: mockWhatsappService,
        },
      ],
    }).compile();

    controller = module.get<ReservasController>(ReservasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
