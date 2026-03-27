import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { RootUser } from './modules/root-users/entities/root-user.entity';
import { RootUserSeeder } from './database/seeders/root-user.seeder';

seeder({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([RootUser]),
  ],
}).run([RootUserSeeder]);
