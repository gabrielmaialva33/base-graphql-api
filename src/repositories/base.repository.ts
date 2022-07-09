import { Knex as KnexOriginal } from 'knex'

import { IPaginateParams, IWithPagination } from '@libs/pagination.interfaces'
import { IBase } from '@interfaces/base.interface'

import Params = IBase.Params

export default abstract class BaseRepository<Entity> implements IBase.Repository<Entity> {
  protected constructor(protected orm: KnexOriginal, protected tableName: string) {}

  public async list({ page, perPage }: Params.List): Promise<IWithPagination<Entity>> {
    return this.orm(this.tableName)
      .orderBy('created_at')
      .paginate({ current_page: page, per_page: perPage })
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
