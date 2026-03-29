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
    // Configuração do TypeORM atualizada para usar variáveis de ambiente separadas
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Rifa, User],
        synchronize: true, // Em desenvolvimento. Mude para false em produção.
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    AuthModule,
    UserModule,
    RifasModule,
  ],
})
export class AppModule {}
