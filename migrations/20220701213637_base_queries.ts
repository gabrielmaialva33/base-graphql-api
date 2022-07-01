import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  knex.raw('create extension if not exists "uuid-ossp";')
}

export async function down(knex: Knex): Promise<void> {
  knex.raw('drop extension "uuid-ossp";')
}
