import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

// Carrega o arquivo .env da raiz do projeto
config(); 

const options: DataSourceOptions = {
  type: 'postgres',
  // Usando variáveis separadas para mais robustez e evitar erros de parsing de URL
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false, // Migrações manuais, então synchronize deve ser false
  // Supabase requer conexão SSL
  ssl: {
    rejectUnauthorized: false,
  },
};

export const AppDataSource = new DataSource(options);
