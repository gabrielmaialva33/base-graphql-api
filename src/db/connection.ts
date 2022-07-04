import { LOG } from '@utils/log'
import Knex from 'knex'
import KnexTinyLogger from 'knex-tiny-logger'

/** logger sql */
const logger = (_?: any, ...log: any[]) => {
  let l = ''
  for (const line of log) l += line + ' '
  return LOG('info', l)
}

const db = KnexTinyLogger(Knex(require('../config').Knex.config), {
  logger,
})

export default db
