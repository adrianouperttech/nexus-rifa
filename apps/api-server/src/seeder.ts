import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from './app.module'; // Importa a configuração centralizada
import { RootUser } from './modules/root-users/entities/root-user.entity';
import { Tenant } from './modules/tenants/entities/tenant.entity';
import { User } from './modules/users/entities/user.entity';
import { Rifa } from './modules/rifas/entities/rifa.entity';
import { Cota } from './modules/cotas/entities/cota.entity';
import { RootUserSeeder } from './database/seeders/root-user.seeder';
import { TestDataSeeder } from './database/seeders/test-data.seeder';

seeder({
  imports: [
    AppModule, // AppModule já contém toda a configuração de BD necessária.
    TypeOrmModule.forFeature([RootUser, Tenant, User, Rifa, Cota]), // Entidades usadas nos seeders.
  ],
}).run([RootUserSeeder, TestDataSeeder]);
