"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const users_service_1 = require("./modules/users/users.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const usersService = app.get(users_service_1.UsersService);
    const user = await usersService.create('tenant-id-placeholder', {
        nome: 'Novo Usuário',
        email: 'usuario@email.com',
        password: 'senha123',
        role: 'user',
        ativo: true,
    });
    console.log('Usuário criado:', user);
    await app.close();
}
bootstrap();
//# sourceMappingURL=create-user.js.map