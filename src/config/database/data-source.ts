import { DataSource } from 'typeorm';
import databaseConfig from './databaseConfig';

export default new DataSource({
  ...databaseConfig,
  entities: ['src/modules/**/**/*.entity.{ts,js}'],
  migrations: ['src/config/database/migrations/*.{ts,js}'],
});
