import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/models/client.entity';
import { ClientRepository } from './repositories/client.repository';

@Module({
  imports : [TypeOrmModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [ClientService,ClientRepository],
})
export class ClientModule {}
