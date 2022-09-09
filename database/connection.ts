import createKnex from 'knex'
import KnexTinyLogger from 'knex-tiny-logger'
import { Knex as KnexOriginal } from 'knex'

import { IPaginateParams, IWithPagination } from 'libs/pagination/pagination.interfaces'

declare module 'knex' {
  namespace Knex {
    interface QueryBuilder<TRecord extends {} = any, TResult = any> {
      paginate<TParams extends IPaginateParams = IPaginateParams>(
        params?: Readonly<TParams>
      ): KnexOriginal.QueryBuilder<TRecord, IWithPagination<TRecord, TParams>>
    }
  }
}

import { LOG } from 'utils/log'
import pagination from 'libs/pagination/pagination'

const logger = (_?: any, ...log: any[]) => {
  let l = ''
  for (const line of log) l += line + ' '
  return LOG('info', l)
}

const db = KnexTinyLogger(createKnex(require('../config').Knex.config), {
  logger,
})

/** attach libs  */
pagination()

export default db
