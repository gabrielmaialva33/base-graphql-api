import { Knex } from 'knex'

import UserEntity from 'app/modules/accounts/entities/user.entity'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(UserEntity.tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))

    table.string('first_name', 80).notNullable()
    table.string('last_name', 80).notNullable()
    table
      .specificType(
        'full_name',
        "varchar(160) generated always as (first_name || ' ' || last_name) stored"
      )
      .nullable()

    table.string('email').notNullable().unique()
    table.string('username', 30).notNullable().unique()
    table.string('password_hash', 118).notNullable()

    table.boolean('is_deleted').notNullable().defaultTo(false)

    table.timestamps(true, true)
    table.timestamp('deleted_at').nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(UserEntity.tableName)
}
