import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from './app.module'; // Importa a configuração centralizada
import { RootUser } from './modules/root-users/entities/root-user.entity'; // O caminho e entidade corretos
import { RootUserSeeder } from './database/seeders/root-user.seeder'; // O seeder correto

seeder({
  imports: [
    AppModule, // AppModule já contém toda a configuração de BD necessária.
    TypeOrmModule.forFeature([RootUser]), // Especifica a entidade para este seeder.
  ],
}).run([RootUserSeeder]);
