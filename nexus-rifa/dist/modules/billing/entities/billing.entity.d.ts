/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Document } from 'mongoose';
export type BillingDocument = Billing & Document;
export declare class Billing {
    id: string;
    userId: string;
    planId: string;
    startDate: Date;
    endDate: Date;
    status: string;
}
export declare const BillingSchema: import("mongoose").Schema<Billing, import("mongoose").Model<Billing, any, any, any, Document<unknown, any, Billing, any, {}> & Billing & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Billing, Document<unknown, {}, import("mongoose").FlatRecord<Billing>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Billing> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
