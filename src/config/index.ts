import dotenv from 'dotenv'
import { parse } from 'pg-connection-string'

dotenv.config()

export namespace Database {
  export const url =
    process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgres'
  export const urlParsed = parse(url)
  export const host = urlParsed.host || process.env.PG_HOST || 'localhost'
  export const port = urlParsed.port || process.env.PG_PORT || 5432
  export const user = urlParsed.user || process.env.PG_USER || 'postgres'
  export const password = urlParsed.password || process.env.PG_PASSWORD || 'postgres'
  export const database = urlParsed.database || process.env.PG_DATABASE || 'postgres'
  export const min = Number(process.env.PG_POOL_MIN || '2')
  export const max = Number(process.env.PG_POOL_MAX || '10')
}

export namespace Knex {
  export const config = {
    client: 'pg',
    connection: {
      host: Database.host,
      port: Database.port,
      user: Database.user,
      password: Database.password,
      database: Database.database,
    },
    pool: {
      min: Database.min,
      max: Database.max,
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

export const AppKey = {
  APP_KEY: process.env.APP_KEY || 'secret',
}

export default { Database, Knex, AppKey }
