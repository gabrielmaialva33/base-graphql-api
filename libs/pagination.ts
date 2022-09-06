import { knex } from 'knex'

import db from 'database/connection'
import { IPaginateParams } from 'libs/pagination.interfaces'

const pagination = () => {
  function paginate(this: typeof db, params: IPaginateParams) {
    let { current_page = 1, per_page = 10, from_start } = params

    if (current_page < 1 || !current_page) current_page = 1
    if (per_page < 1 || !per_page) per_page = 1

    const offset = from_start ? 0 : (current_page - 1) * per_page
    const limit = from_start ? per_page * current_page : per_page

    const postProcessResponse = this.client.config.postProcessResponse
      ? this.client.config.postProcessResponse
      : (key: any) => key

    let countQuery: { transacting: (arg0: any) => any }
    countQuery = new this.constructor(this.client)
      .count('* as total')
      .from(this.clone().offset(0).clearOrder().as('count__query__'))
      .first()
      .debug(this._debug)

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
