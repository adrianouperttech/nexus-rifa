import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RifasModule } from './rifas/rifas.module';
import { Rifa } from './rifas/rifa.entity';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'your_password',
      database: 'nexus-rifa',
      entities: [Rifa, User],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    RifasModule,
  ],
})
export class AppModule {}
