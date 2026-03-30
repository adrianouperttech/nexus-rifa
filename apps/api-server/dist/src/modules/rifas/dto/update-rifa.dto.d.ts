import { CreateRifaDto } from './create-rifa.dto';
declare const UpdateRifaDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRifaDto>>;
export declare class UpdateRifaDto extends UpdateRifaDto_base {
    readonly name?: string;
    readonly description?: string;
    readonly price?: number;
    readonly limit?: number;
}
export {};
