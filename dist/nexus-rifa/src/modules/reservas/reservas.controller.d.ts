import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
export declare class ReservasController {
    private readonly reservasService;
    constructor(reservasService: ReservasService);
    create(createReservaDto: CreateReservaDto, tenant_id: string): Promise<import("./entities/reserva.entity").Reserva>;
    findAll(): Promise<import("./entities/reserva.entity").Reserva[]>;
    findOne(id: string): Promise<import("./entities/reserva.entity").Reserva>;
    update(id: string, updateReservaDto: UpdateReservaDto): Promise<import("./entities/reserva.entity").Reserva>;
    remove(id: string): Promise<void>;
}
