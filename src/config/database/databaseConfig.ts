import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  entities: ['dist/modules/**/**/*.entity.{ts,js}'],
  migrations: ['dist/config/database/migrations/*.{ts,js}'],
};

export default databaseConfig;
