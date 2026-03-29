import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RifasModule } from './rifas/rifas.module';
import { Rifa } from './rifas/rifa.entity';
import { User } from './user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // Configuração do TypeORM para usar a DATABASE_URL do Render e forçar IPv4
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [Rifa, User],
        synchronize: false,
        ssl: {
          rejectUnauthorized: false,
        },
        extra: {
          family: 4, // Força o driver do node-postgres a usar IPv4
        },
      }),
    }),
    AuthModule,
    UserModule,
    RifasModule,
  ],
})
export class AppModule {}
