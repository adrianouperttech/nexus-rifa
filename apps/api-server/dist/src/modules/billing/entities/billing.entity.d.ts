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
