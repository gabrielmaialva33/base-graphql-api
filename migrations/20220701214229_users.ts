import { Knex } from 'knex'

const tableName = 'users'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))

    table.string('first_name', 80).notNullable()
    table.string('last_name', 80).notNullable()
    table.string('email').notNullable().unique()
    table.string('password_hash').notNullable()

    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName)
}
