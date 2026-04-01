import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
export declare class ReservasController {
    private readonly reservasService;
    constructor(reservasService: ReservasService);
    create(createReservaDto: CreateReservaDto, req: any): Promise<import("./entities/reserva.entity").Reserva>;
    findAll(req: any): Promise<import("./entities/reserva.entity").Reserva[]>;
    findOne(id: string, req: any): Promise<import("./entities/reserva.entity").Reserva>;
    update(id: string, updateReservaDto: UpdateReservaDto, req: any): Promise<import("./entities/reserva.entity").Reserva>;
    remove(id: string, req: any): Promise<void>;
}
