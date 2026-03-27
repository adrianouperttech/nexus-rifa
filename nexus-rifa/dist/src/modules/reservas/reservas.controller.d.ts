import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
export declare class ReservasController {
    private readonly reservasService;
    constructor(reservasService: ReservasService);
    create(createReservaDto: CreateReservaDto, tenant_id: string): Promise<import("./entities/reserva.entity").Reserva>;
    findAll(tenant_id: string): Promise<import("./entities/reserva.entity").Reserva[]>;
    findOne(id: string, tenant_id: string): Promise<import("./entities/reserva.entity").Reserva>;
    update(id: string, updateReservaDto: UpdateReservaDto, tenant_id: string): Promise<import("./entities/reserva.entity").Reserva>;
    remove(id: string, tenant_id: string): Promise<void>;
}
