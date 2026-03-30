import { CreateReservaDto } from './create-reserva.dto';
declare const UpdateReservaDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateReservaDto>>;
export declare class UpdateReservaDto extends UpdateReservaDto_base {
    readonly nome?: string;
    readonly whatsapp?: string;
    readonly email?: string;
    readonly status?: string;
}
export {};
