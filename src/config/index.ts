import dotenv from 'dotenv'
import { parse } from 'pg-connection-string'

dotenv.config()

export namespace Database {
  export const url =
    process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgre'
  export const config = parse(url)
  export const { host, port, user, password, database } = config
  export const min = Number(process.env.PG_POOL_MIN || '2')
  export const max = Number(process.env.PG_POOL_MAX || '10')
}

export namespace Knex {
  export const config = {
    client: 'pg',
    connection: {
      host: process.env.PG_HOST || Database.host,
      port: process.env.PG_PORT || Database.port,
      user: process.env.PG_USER || Database.user,
      password: process.env.PG_PASSWORD || Database.password,
      database: process.env.PG_DB_NAME || Database.database,
    },
    pool: {
      min: Number(process.env.PG_POOL_MIN) || Database.min,
      max: Number(process.env.PG_POOL_MAX) || Database.max,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  }
}

export default { Database, Knex }
