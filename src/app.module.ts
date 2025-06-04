import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { SeedService } from './modules/seed/seed.service';
import { ENTITIES } from './models/index.entity';
import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature(ENTITIES),
    // UserModule, 
    AuthModule,
    ClientModule,
  ],
  providers: [SeedService],
})
export class AppModule {}
