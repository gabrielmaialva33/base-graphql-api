import { Knex } from 'knex'
import UserEntity from 'app/modules/accounts/entities/user.entity'
import argon2 from 'argon2'

const tableName = 'users'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableName).del()

  // Inserts seed entries
  await knex(tableName).insert<typeof UserEntity>([
    {
      first_name: 'Root',
      last_name: 'System',
      email: 'root@graph.com.br',
      username: 'root',
      password_hash: await argon2.hash('123456'),
    },
    {
      first_name: 'Admin',
      last_name: 'System',
      email: 'admin@graph.com.br',
      username: 'admin',
      password_hash: await argon2.hash('123456'),
    },
    {
      first_name: 'Gabriel',
      last_name: 'Maia',
      email: 'maia@graph.com.br',
      username: 'maia',
      password_hash: await argon2.hash('123456'),
    },
  ])
}
