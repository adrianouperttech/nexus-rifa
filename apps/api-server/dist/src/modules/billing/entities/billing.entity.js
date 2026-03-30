"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingSchema = exports.Billing = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const uuid_1 = require("uuid");
let Billing = class Billing {
};
exports.Billing = Billing;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: uuid_1.v4,
    }),
    __metadata("design:type", String)
], Billing.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Billing.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Billing.prototype, "planId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        required: true,
    }),
    __metadata("design:type", Date)
], Billing.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        required: true,
    }),
    __metadata("design:type", Date)
], Billing.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['active', 'inactive', 'cancelled'],
        default: 'active',
    }),
    __metadata("design:type", String)
], Billing.prototype, "status", void 0);
exports.Billing = Billing = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], Billing);
exports.BillingSchema = mongoose_1.SchemaFactory.createForClass(Billing);
//# sourceMappingURL=billing.entity.js.map