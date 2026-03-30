"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nestjs_seeder_1 = require("nestjs-seeder");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const database_module_1 = require("./database/database.module");
const root_user_entity_1 = require("./modules/root-users/entities/root-user.entity");
const root_user_seeder_1 = require("./database/seeders/root-user.seeder");
(0, nestjs_seeder_1.seeder)({
    imports: [
        config_1.ConfigModule.forRoot({
            isGlobal: true,
        }),
        database_module_1.DatabaseModule,
        typeorm_1.TypeOrmModule.forFeature([root_user_entity_1.RootUser]),
    ],
}).run([root_user_seeder_1.RootUserSeeder]);
//# sourceMappingURL=seeder.js.map