import { knex } from 'knex'

import db from '@database/connection'
import { IPaginateParams } from '@libs/pagination.interface'

const pagination = () => {
  function paginate(this: typeof db, params: IPaginateParams) {
    let { current_page, per_page, is_from_start, is_length_aware } = params

    const shouldFetchTotals = is_length_aware || current_page === 1 || is_from_start
    let countQuery: { transacting: (arg0: any) => any }

    if (current_page < 1) current_page = 1

    const offset = is_from_start ? 0 : (current_page - 1) * per_page
    const limit = is_from_start ? per_page * current_page : per_page

    const postProcessResponse = this.client.config.postProcessResponse
      ? this.client.config.postProcessResponse
      : (key: any) => key

    if (shouldFetchTotals) {
      countQuery = new this.constructor(this.client)
        .count('* as total')
        .from(this.clone().offset(0).clearOrder().as('count__query__'))
        .first()
        .debug(this._debug)
    }

    this.offset(offset).limit(limit)

    return this.client.transaction(async (trx: any) => {
      const data = await this.transacting(trx)

      const countResult = await countQuery.transacting(trx)
      const total = +(countResult.TOTAL || countResult.total)

      const meta = postProcessResponse({
        total,
        last_page: Math.ceil(total / per_page),
        per_page,
        current_page,
        from: offset,
        to: offset + data.length,
      })

      return { meta, data }
    })
  }

  knex.QueryBuilder.extend('paginate', paginate)
}

export default pagination
