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
exports.Premio = void 0;
const typeorm_1 = require("typeorm");
const rifa_entity_1 = require("../../rifas/entities/rifa.entity");
let Premio = class Premio {
    id;
    description;
    position;
    rifa;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Premio.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Premio.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Premio.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rifa_entity_1.Rifa, (rifa) => rifa.premios),
    __metadata("design:type", rifa_entity_1.Rifa)
], Premio.prototype, "rifa", void 0);
Premio = __decorate([
    (0, typeorm_1.Entity)('premios')
], Premio);
exports.Premio = Premio;
//# sourceMappingURL=premio.entity.js.map