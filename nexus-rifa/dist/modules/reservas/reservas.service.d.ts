import { Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { RifasService } from '../rifas/rifas.service';
import { EmailService } from '../../integrations/email/email.service';
import { WhatsappService } from '../../integrations/whatsapp/whatsapp.service';
export declare class ReservasService {
    private readonly reservaRepository;
    private readonly rifasService;
    private readonly emailService;
    private readonly whatsappService;
    constructor(reservaRepository: Repository<Reserva>, rifasService: RifasService, emailService: EmailService, whatsappService: WhatsappService);
    create(createReservaDto: CreateReservaDto, tenant_id: string): Promise<Reserva>;
    findAll(tenant_id: string): Promise<Reserva[]>;
    findByStatus(status: string): Promise<Reserva[]>;
    findOne(tenant_id: string, id: string): Promise<Reserva>;
    update(tenant_id: string, id: string, updateReservaDto: UpdateReservaDto): Promise<Reserva>;
    updateStatus(tenant_id: string, id: string, status: string): Promise<Reserva>;
    remove(tenant_id: string, id: string): Promise<void>;
}
