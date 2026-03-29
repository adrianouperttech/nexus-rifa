import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

// Carrega o arquivo .env da raiz do projeto
config();

const options: DataSourceOptions = {
  type: 'postgres',
  // Usando a DATABASE_URL para a conexão
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false, // Com migrações manuais, synchronize deve ser false
  // Supabase requer conexão SSL
  ssl: {
    rejectUnauthorized: false, // Em desenvolvimento, para produção é recomendado usar o certificado CA
  },
};

export const AppDataSource = new DataSource(options);
