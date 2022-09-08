import { Knex } from 'knex'

const tableName = 'roles'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableName).del()

  // Inserts seed entries
  await knex(tableName).insert([
    {
      name: 'root',
      slug: 'Root',
      description: 'Root user',
    },
    {
      name: 'admin',
      slug: 'Admin',
      description: 'Admin user',
    },
    {
      name: 'user',
      slug: 'User',
      description: 'User',
    },
  ])
}
