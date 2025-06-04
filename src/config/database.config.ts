import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
config();
import * as fs from 'fs';
import * as path from 'path';

const passwordPath = path.resolve(__dirname, '../../db/password.txt');
const dbPassword = fs.readFileSync(passwordPath, 'utf8').trim();
console.log("dbPassword",dbPassword);
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: dbPassword || 'password',
  database: process.env.DB_NAME || 'mydb',
  entities: [__dirname + '/../models/*.entity.{js,ts}'], 
  synchronize: true, // Set to false in production
};
