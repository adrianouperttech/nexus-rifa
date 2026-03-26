import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './modules/users/users.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  const user = await usersService.create({
    tenant_id: 'tenant-id-placeholder',
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
