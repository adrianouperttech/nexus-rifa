import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RifasModule } from './modules/rifas/rifas.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
          entities: [__dirname + '/modules/**/*.entity{.ts,.js}'],
          synchronize: true, // Alterado para true para desenvolvimento
          ssl: {
            rejectUnauthorized: false,
          },
        };
      },
    }),
    AuthModule,
    UsersModule,
    RifasModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
