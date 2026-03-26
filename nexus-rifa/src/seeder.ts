import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { RootUser } from './modules/root-users/entities/root-user.entity';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

seeder({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([RootUser]),
  ],
}).run([
  {
    inject: [DataSource],
    run: async (dataSource: DataSource) => {
      const rootUserRepository = dataSource.getRepository(RootUser);
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
