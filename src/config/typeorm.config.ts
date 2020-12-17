import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '',
  port: 5432,
  username: 'admin',
  password: 'secret',
  database: 'taskManagement',
  entities: [__dirname + '/../**/*.entity.ts'],
  synchronize: true,
}