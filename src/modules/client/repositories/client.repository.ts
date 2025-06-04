// src/modules/v1/user/repositories/user.repository.ts
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ClientSerializer } from '../serializer/client.serializer';
import { BaseRepository } from 'src/common/repository/base.repository';
import { Client, User } from 'src/models/index.entity';

// User repository for database operations on the User entity
@Injectable()
export class ClientRepository extends BaseRepository<Client, ClientSerializer> {
  constructor(private readonly dataSource: DataSource) {
    super(Client, dataSource.createEntityManager());
  }
}
