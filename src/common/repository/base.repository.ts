import { plainToClass, ClassConstructor } from 'class-transformer';
import {
  DeepPartial,
  FindManyOptions,
  ILike,
  ObjectLiteral,
  Repository,
  FindOptionsWhere,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Pagination } from 'src/paginate';
import { PaginationInfoInterface } from 'src/paginate/pagination-info.interface';
import { SearchFilterInterface } from 'src/common/interfaces/search-filter.interface';
import { NotFoundException } from '@nestjs/common';
import { ModelSerializer } from '../serializer/model.serializer';
/**
 * Interface for search filter parameters
 * keywords - Optional search term to filter results
 * limit - Optional number of items per page
 * page - Optional page number for pagination
 */

/**
 * Generic repository class with common database operations.
 */
export class BaseRepository<
  T extends ObjectLiteral,
  K extends ModelSerializer,
> extends Repository<T> {
  /**
   * Fetch a single entity by ID.
   */
  async get(
    id: string,
    relations: string[] = [],
    transformOptions = {},
  ): Promise<K | null> {
    const entity = await this.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
      relations,
    });
    if (!entity) throw new NotFoundException();
    return this.transform(entity, transformOptions);
  }

  /**
   * Find an entity by a specific field.
   */
  async findByField(
    fieldName: keyof T,
    value: any,
    relations: string[] = [],
    transformOptions = {},
  ): Promise<K | null> {
    const entity = await this.findOne({
      where: { [fieldName]: value } as FindOptionsWhere<T>,
      relations,
    });
    if (!entity) throw new NotFoundException();
    return this.transform(entity, transformOptions);
  }

  /**
   * Count entities based on conditions.
   */
  async countEntityByCondition(
    conditions: FindOptionsWhere<T> = {},
  ): Promise<number> {
    return this.count({ where: conditions });
  }

  /**
   * Find all entities with optional search filtering.
   */
  async findAll(
    searchFilter: DeepPartial<SearchFilterInterface>,
    relations: string[] = [],
    searchCriteria: (keyof T)[],
    transformOptions = {},
  ): Promise<K[]> {
    const whereCondition: FindOptionsWhere<T>[] = [];
    if (searchFilter.keywords) {
      for (const key of searchCriteria) {
        whereCondition.push({
          [key]: ILike(`%${searchFilter.keywords}%`),
        } as FindOptionsWhere<T>);
      }
    }
    const results = await this.find({ where: whereCondition, relations });
    return this.transformMany(results, transformOptions);
  }

  /**
   * Get pagination details based on page and limit.
   */
  getPaginationInfo(options: {
    page?: number;
    limit?: number;
  }): PaginationInfoInterface {
    const page = options.page && options.page > 0 ? options.page : 1;
    const limit = options.limit && options.limit > 0 ? options.limit : 10;
    return { skip: (page - 1) * limit, limit, page };
  }

  /**
   * Paginate results based on search criteria.
   */
  async paginate(
    searchFilter: DeepPartial<SearchFilterInterface>,
    relations: string[] = [],
    searchCriteria: (keyof T)[] = [],
    transformOptions = {},
  ): Promise<Pagination<K>> {
    const whereCondition: FindOptionsWhere<T>[] = [];
    if (searchFilter.keywords) {
      for (const key of searchCriteria) {
        whereCondition.push({
          [key]: ILike(`%${searchFilter.keywords}%`),
        } as FindOptionsWhere<T>);
      }
    }
    const paginationInfo = this.getPaginationInfo(searchFilter);
    const findOptions: FindManyOptions<T> = {
      relations,
      take: paginationInfo.limit,
      skip: paginationInfo.skip,
      where: whereCondition.length ? whereCondition : undefined,
      order: { created_at: 'DESC' } as any,
    };
    const [results, total] = await this.findAndCount(findOptions);
    return new Pagination<K>({
      data: this.transformMany(results, transformOptions),
      totalItems: total,
      pageSize: paginationInfo.limit,
      currentPage: paginationInfo.page,
      previous: paginationInfo.page > 1 ? paginationInfo.page - 1 : 0,
      next:
        total > paginationInfo.skip + paginationInfo.limit
          ? paginationInfo.page + 1
          : 0,
    });
  }

  /**
   * Create a new entity and return the created entity.
   */
  async createEntity(
    inputs: DeepPartial<T>,
    relations: string[] = [],
  ): Promise<K> {
    const entity = await this.save(inputs);
    return this.get((entity as any).id, relations) as Promise<K>;
  }

  /**
   * Update an entity and return the updated entity.
   */
  async updateEntity(
    entity: K,
    inputs: QueryDeepPartialEntity<T>,
    relations: string[] = [],
  ): Promise<K> {
    await this.update(entity.id, inputs);
    return this.get(entity.id, relations) as Promise<K>;
  }

  /**
   * Convert a single entity to a serialized format.
   */
  transform(model: T, transformOptions = {}): K | null {
    if (!model) return null;
    const transformed = plainToClass(this.target as unknown as ClassConstructor<T>, model, transformOptions);
    return transformed as unknown as K;
  }

  /**
   * Convert multiple entities to a serialized format.
   */
  transformMany(models: T[], transformOptions = {}): K[] {
    if (!models) return [];
    return models.map((model) => this.transform(model, transformOptions)).filter((model): model is K => model !== null);
  }
}