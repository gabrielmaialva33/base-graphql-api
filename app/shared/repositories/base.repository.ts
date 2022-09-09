import { Knex as KnexOriginal } from 'knex'

import { IPaginateParams, IWithPagination } from 'libs/pagination.interfaces'
import { IBase } from 'app/shared/interfaces/base.interface'

import DTO = IBase.DTO

export default abstract class BaseRepository<Entity extends {}>
  implements IBase.Repository<Entity>
{
  protected constructor(protected orm: KnexOriginal, protected tableName: string) {}

  /**
   * List all entities implementation
   */
  public async list({
    page = 1,
    perPage = 10,
    sortBy = 'id',
    direction = 'ASC',
  }: DTO.List<Entity>): Promise<IWithPagination<Entity>> {
    return this.orm<Entity>(this.tableName)
      .whereNot('is_deleted', true)
      .orderBy('created_at')
      .paginate({ current_page: page, perPage, sortBy: String(sortBy), direction })
  }

  /**
   * Store a new entity implementation
   */
  public async store(data: Partial<Entity>): Promise<Entity> {
    const [{ id }] = await this.orm(this.tableName).insert(data).returning('id')
    return this.orm(this.tableName).select('*').where('id', id).first()
  }

  /**
   * Save an existing entity implementation
   */
  public async save(entityId: string, data: DTO.Save<Entity>): Promise<Entity> {
    const [{ id }] = await this.orm(this.tableName)
      .where({ id: entityId })
      .update(data)
      .returning('id')
    return this.orm(this.tableName).select('*').where('id', id).first()
  }

  /**
   * Find an entity by column value implementation
   */
  public async findBy({ column, value }: DTO.Get<Entity>): Promise<Entity | null> {
    if (Array.isArray(column))
      return this.orm(this.tableName)
        .whereNot('is_deleted', true)
        .where(function () {
          column.forEach((c) => this.orWhere(c, value))
        })
        .first()

    return this.orm(this.tableName)
      .whereNot('is_deleted', true)
      .where(String(column), value)
      .first()
  }
}

/**
 * Pagination extension for Knex
 */
declare module 'knex' {
  namespace Knex {
    interface QueryBuilder<TRecord extends {} = any, TResult = any> {
      paginate<TParams extends IPaginateParams = IPaginateParams>(
        params?: Readonly<TParams>
      ): KnexOriginal.QueryBuilder<TRecord, IWithPagination<TRecord, TParams>>
    }
  }
}
