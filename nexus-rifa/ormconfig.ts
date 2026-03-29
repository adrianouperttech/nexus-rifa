import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

// Carrega o arquivo .env para desenvolvimento local. Em produção, DATABASE_URL será fornecida pelo Render.
config();

// Verifica se a DATABASE_URL está disponível. Se não, falha com erro.
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não foi definida. Verifique suas variáveis de ambiente.');
}

const options: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL, // A MUDANÇA PRINCIPAL ESTÁ AQUI
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false, // Nunca use synchronize: true em produção
  ssl: {
    // O Render exige SSL para conexões externas, mas as conexões internas (como esta) são seguras
    // rejectUnauthorized: false é frequentemente necessário para se conectar ao DB do Render a partir de um web service
    rejectUnauthorized: false,
  },
};

export const AppDataSource = new DataSource(options);
