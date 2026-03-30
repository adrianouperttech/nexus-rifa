import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { RifasModule } from '../rifas/rifas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Esta é agora a ÚNICA configuração do TypeORM em toda a sua aplicação.
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
          autoLoadEntities: true, // Encontra automaticamente todas as suas entidades
          synchronize: false, // NUNCA usar synchronize: true em produção
          ssl: {
            rejectUnauthorized: false, // Necessário para a maioria das conexões de BD em nuvem
          },
          // A CORREÇÃO DEFINITIVA: Força o driver do banco de dados a usar a rede IPv4
          extra: {
            family: 4,
          },
        };
      },
    }),
    AuthModule,
    UserModule,
    RifasModule,
  ],
})
export class AppModule {}
