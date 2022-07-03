import { LOG } from '@utils/log'
import Knex from 'knex'
import KnexTinyLogger from 'knex-tiny-logger'

const db = KnexTinyLogger(Knex(require('../config').Knex.config), {
  bindings: true,
  logger: (_?: any, ...log: any[]) => {
    let l = ''
    for (const line of log) l += line + ' '
    return LOG('info', l)
  },
})

export default db
