"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nestjs_seeder_1 = require("nestjs-seeder");
const typeorm_1 = require("@nestjs/typeorm");
const app_module_1 = require("./app.module");
const root_user_entity_1 = require("./modules/root-users/entities/root-user.entity");
const root_user_seeder_1 = require("./database/seeders/root-user.seeder");
(0, nestjs_seeder_1.seeder)({
    imports: [
        app_module_1.AppModule,
        typeorm_1.TypeOrmModule.forFeature([root_user_entity_1.RootUser]),
    ],
}).run([root_user_seeder_1.RootUserSeeder]);
//# sourceMappingURL=seeder.js.map