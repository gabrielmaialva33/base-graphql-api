import { Knex as KnexOriginal } from 'knex'

import { IPaginateParams, IWithPagination } from '@libs/pagination.interfaces'
import { IBase } from '@interfaces/base.interface'

import Params = IBase.Params

export default abstract class BaseRepository<Entity> implements IBase.Repository<Entity> {
  protected constructor(protected orm: KnexOriginal, protected tableName: string) {}

  /**
   * List all entities implementation
   */
  public async list({ page, perPage }: Params.List): Promise<IWithPagination<Entity>> {
    return this.orm<Entity>(this.tableName)
      .where('is_deleted', false)
      .orderBy('created_at')
      .paginate({ current_page: page, per_page: perPage })
  }

  /**
   * Store a new entity implementation
   */
  public async store(data: Partial<Entity>): Promise<Entity> {
    const [{ id }] = await this.orm(this.tableName).insert(data).returning('id')
    return this.orm(this.tableName).select('*').where('id', id).first()
  }

  public async findBy(column: string, value: any): Promise<Entity | null> {
    return this.orm(this.tableName).where(column, value).first()
  }
}

declare module 'knex' {
  namespace Knex {
    interface QueryBuilder<TRecord extends {} = any, TResult = any> {
      paginate<TParams extends IPaginateParams = IPaginateParams>(
        params?: Readonly<TParams>
      ): KnexOriginal.QueryBuilder<TRecord, IWithPagination<TRecord, TParams>>
    }
  }
}
