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
    // Configuração do TypeORM para usar a DATABASE_URL do Render
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'), // Usar a URL de conexão direta
        entities: [Rifa, User],
        synchronize: false, // NUNCA usar synchronize: true em produção
        ssl: {
          rejectUnauthorized: false, // Necessário para a conexão interna do Render
        },
      }),
    }),
    AuthModule,
    UserModule,
    RifasModule,
  ],
})
export class AppModule {}
