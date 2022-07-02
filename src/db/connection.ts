import Knex from 'knex'
import KnexTinyLogger from 'knex-tiny-logger'

const db = KnexTinyLogger(Knex(require('../config').Knex.config), {
  bindings: true,
})

export default db
