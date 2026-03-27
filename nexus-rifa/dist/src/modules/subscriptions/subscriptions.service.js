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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const subscription_entity_1 = require("./entities/subscription.entity");
let SubscriptionsService = class SubscriptionsService {
    constructor(subscriptionModel) {
        this.subscriptionModel = subscriptionModel;
    }
    async create(createSubscriptionDto) {
        const createdSubscription = new this.subscriptionModel(createSubscriptionDto);
        return createdSubscription.save();
    }
    async findAll() {
        return this.subscriptionModel.find().exec();
    }
    async findOne(id) {
        return this.subscriptionModel.findOne({ id }).exec();
    }
    async update(id, updateSubscriptionDto) {
        return this.subscriptionModel.findOneAndUpdate({ id }, updateSubscriptionDto, { new: true });
    }
    async remove(id) {
        return this.subscriptionModel.deleteOne({ id }).exec();
    }
};
SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(subscription_entity_1.Subscription.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SubscriptionsService);
exports.SubscriptionsService = SubscriptionsService;
//# sourceMappingURL=subscriptions.service.js.map