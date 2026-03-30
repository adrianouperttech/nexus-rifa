import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RifasModule } from './modules/rifas/rifas.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'; // Importa o Throttler
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Configuração do Rate Limiter
    ThrottlerModule.forRoot([{
      ttl: 60000, // 60 segundos
      limit: 60, // 60 requisições
    }]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        if (!databaseUrl) {
          throw new Error('A variável de ambiente DATABASE_URL não está definida.');
        }

        return {
          type: 'postgres',
          url: databaseUrl,
          autoLoadEntities: true,
          synchronize: false,
          ssl: {
            rejectUnauthorized: false,
          },
          extra: {
            family: 4,
          },
        };
      },
    }),
    AuthModule,
    UsersModule,
    RifasModule,
  ],
  providers: [
    // Aplica o Rate Limiter globalmente em todas as rotas
    {
      provide: APP_GUARD,
      use: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
