import { knex } from 'knex'

import db from 'database/connection'
import { IPaginateParams } from 'libs/pagination.interfaces'

const pagination = () => {
  function paginate(this: typeof db, params: IPaginateParams) {
    let { currentPage = 1, perPage = 10, fromStart, sortBy = 'id', direction = 'ASC' } = params

    if (currentPage < 1 || !currentPage) currentPage = 1
    if (perPage < 1 || !perPage) perPage = 1

    const offset = fromStart ? 0 : (currentPage - 1) * perPage
    const limit = fromStart ? perPage * currentPage : perPage

    const postProcessResponse = this.client.config.postProcessResponse
      ? this.client.config.postProcessResponse
      : (key: any) => key

    let countQuery: { transacting: (arg0: any) => any }
    countQuery = new this.constructor(this.client)
      .count('* as total')
      .from(this.clone().offset(0).clearOrder().as('count__query__'))
      .first()
      .debug(this._debug)

    this.clearOrder().offset(offset).limit(limit).orderBy(sortBy, direction)

    return this.client.transaction(async (trx: any) => {
      const data = await this.transacting(trx)

      const countResult = await countQuery.transacting(trx)
      const total = +(countResult.TOTAL || countResult.total)

      const meta = postProcessResponse({
        total,
        last_page: Math.ceil(total / perPage),
        per_page: perPage,
        current_page: currentPage,
        sort_by: sortBy,
        direction,
        from: offset,
        to: offset + data.length,
      })

      return { meta, data }
    })
  }

  knex.QueryBuilder.extend('paginate', paginate)
}

export default pagination
