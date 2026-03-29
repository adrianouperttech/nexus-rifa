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
    // Configuração do TypeORM atualizada para usar DATABASE_URL do Supabase
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [Rifa, User],
        synchronize: true, // Em desenvolvimento. Mude para false em produção e use migrações.
        // Supabase requer conexão SSL
        ssl: {
          rejectUnauthorized: false, // Em desenvolvimento. Para produção use o certificado CA.
        },
      }),
    }),
    AuthModule,
    UserModule,
    RifasModule,
  ],
})
export class AppModule {}
