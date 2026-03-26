"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const nestjs_seeder_1 = require("nestjs-seeder");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const database_module_1 = require("./database/database.module");
const root_user_entity_1 = require("./modules/root-users/entities/root-user.entity");
const bcrypt = __importStar(require("bcrypt"));
const typeorm_2 = require("typeorm");
(0, nestjs_seeder_1.seeder)({
    imports: [
        config_1.ConfigModule.forRoot({
            isGlobal: true,
        }),
        database_module_1.DatabaseModule,
        typeorm_1.TypeOrmModule.forFeature([root_user_entity_1.RootUser]),
    ],
}).run([
    {
        inject: [typeorm_2.DataSource],
        run: async (dataSource) => {
            const rootUserRepository = dataSource.getRepository(root_user_entity_1.RootUser);
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash('root', salt);
            const rootUser = rootUserRepository.create({
                email: 'root@example.com',
                password: hashedPassword,
            });
            await rootUserRepository.save(rootUser);
        },
    },
]);
//# sourceMappingURL=seeder.js.map