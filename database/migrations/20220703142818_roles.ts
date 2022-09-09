import { Knex } from 'knex'

const tableName = 'roles'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))

    table.string('slug', 40).notNullable()
    table.string('name', 40).notNullable()
    table.text('description').notNullable()
    table.boolean('is_deleted').defaultTo(false)

    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName)
}
