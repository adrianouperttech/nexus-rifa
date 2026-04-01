
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RifasModule } from './modules/rifas/rifas.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { Cota } from './modules/cotas/entities/cota.entity';
import { Rifa } from './modules/rifas/entities/rifa.entity';
import { User } from './modules/users/entities/user.entity';
import { RootUser } from './modules/root-users/entities/root-user.entity';
import { Premio } from './modules/premios/entities/premio.entity';
import { Reserva } from './modules/reservas/entities/reserva.entity';
import { Pagamento } from './modules/pagamentos/entities/pagamento.entity';
import { Tenant } from './modules/tenants/entities/tenant.entity';
import { TenantsModule } from './modules/tenants/tenants.module';
import { Subscription } from './modules/billing/entities/subscription.entity';
import { BillingModule } from './modules/billing/billing.module';
import { LoggerModule } from './common/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000, // 60 segundos
      limit: 60, // 60 requisições
    }]),
  ],
  controllers: [AppController],
  providers: [AppService,
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
          entities: [Cota, Rifa, User, RootUser, Premio, Reserva, Pagamento, Tenant, Subscription],
          synchronize: false,
          ssl: {
            rejectUnauthorized: false,
          },
        };
      },
    }),
    AuthModule,
    UsersModule,
    RifasModule,
    TenantsModule,
    BillingModule,
    LoggerModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
