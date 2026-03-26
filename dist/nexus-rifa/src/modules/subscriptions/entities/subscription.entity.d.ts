/// <reference types="nexus-rifa/node_modules/mongoose/types/aggregate" />
/// <reference types="nexus-rifa/node_modules/mongoose/types/callback" />
/// <reference types="nexus-rifa/node_modules/mongoose/types/collection" />
/// <reference types="nexus-rifa/node_modules/mongoose/types/connection" />
/// <reference types="nexus-rifa/node_modules/mongoose/types/cursor" />
/// <reference types="nexus-rifa/node_modules/mongoose/types/document" />
/// <reference types="nexus-rifa/node_modules/mongoose/types/error" />
/// <reference types="nexus-rifa/node_modules/mongoose/types/expressions" />
/// <reference types="nexus-rifa/node_modules/mongoose/types/helpers" />
/// <reference types="nexus-rifa/node_modules/mongoose/types/middlewares" />
/// <reference types="nexus-rifa/node_modules/mongoose/types/indexes" />
/// <reference types="nexus-rifa/node_modules/mongoose/types/models" />
/// <reference types="nexus-rifa/node_modules/mongoose/types/mongooseoptions" />
/// <reference types="nexus-rifa/node_modules/mongoose/types/pipelinestage" />
/// <reference types="nexus-rifa/node_modules/mongoose/types/populate" />
/// <reference types="nexus-rifa/node_modules/mongoose/types/query" />
/// <reference types="nexus-rifa/node_modules/mongoose/types/schemaoptions" />
/// <reference types="nexus-rifa/node_modules/mongoose/types/session" />
/// <reference types="nexus-rifa/node_modules/mongoose/types/types" />
/// <reference types="nexus-rifa/node_modules/mongoose/types/utility" />
/// <reference types="nexus-rifa/node_modules/mongoose/types/validation" />
/// <reference types="nexus-rifa/node_modules/mongoose/types/virtuals" />
/// <reference types="nexus-rifa/node_modules/mongoose/types" />
/// <reference types="nexus-rifa/node_modules/mongoose/types/schematypes" />
/// <reference types="nexus-rifa/node_modules/mongoose/types/inferschematype" />
/// <reference types="nexus-rifa/node_modules/mongoose/types/inferrawdoctype" />
import { Document } from 'mongoose';
export type SubscriptionDocument = Subscription & Document;
export declare class Subscription {
    id: string;
    userId: string;
    planId: string;
    status: string;
}
export declare const SubscriptionSchema: import("mongoose").Schema<Subscription, import("mongoose").Model<Subscription, any, any, any, Document<unknown, any, Subscription, any, {}> & Subscription & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Subscription, Document<unknown, {}, import("mongoose").FlatRecord<Subscription>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Subscription> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
