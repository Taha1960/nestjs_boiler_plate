// src/modules/v1/user/repositories/user.repository.ts
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserSerializer } from '../serializer/user.serializer';
import { BaseRepository } from 'src/common/repository/base.repository';
import { User } from 'src/models/index.entity';

// User repository for database operations on the User entity
@Injectable()
export class UserRepository extends BaseRepository<User, UserSerializer> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}
