import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientRepository } from './repositories/client.repository';

@Injectable()
export class ClientService {

  constructor(
    @InjectRepository(ClientRepository) private clientRepository: ClientRepository
  ) { }
  create(createClientDto: CreateClientDto) {
    return 'This action adds a new client';
  }

  async findAll() {
    return await this.clientRepository.paginate({});
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
