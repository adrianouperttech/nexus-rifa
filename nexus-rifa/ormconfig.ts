import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

// Carrega o arquivo .env para desenvolvimento local. Em CI, as variáveis já devem estar no ambiente.
config();

// Lista de variáveis de ambiente obrigatórias para a conexão com o banco de dados.
const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_PASSWORD', 'DB_DATABASE'];

// Verifica se todas as variáveis de ambiente obrigatórias estão definidas.
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    // Falha o script imediatamente com uma mensagem de erro clara.
    throw new Error(`Erro Crítico de Migração: A variável de ambiente obrigatória '${envVar}' não foi definida.`);
  }
}

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
};

export const AppDataSource = new DataSource(options);
