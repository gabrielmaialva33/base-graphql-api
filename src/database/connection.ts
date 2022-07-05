import { LOG } from '@utils/log'
import Knex from 'knex'
import KnexTinyLogger from 'knex-tiny-logger'

import { attachPaginate } from 'knex-paginate'

/** logger sql */
const logger = (_?: any, ...log: any[]) => {
  let l = ''
  for (const line of log) l += line + ' '
  return LOG('info', l)
}

attachPaginate()

const db = KnexTinyLogger(Knex(require('../config').Knex.config), {
  logger,
})

export default db
