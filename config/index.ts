import dotenv from 'dotenv'
import 'reflect-metadata'
import { parse } from 'pg-connection-string'

dotenv.config()

export namespace Database {
  export const url = process.env.DATABASE_URL
  export const urlParsed = url ? parse(url) : null
  export const host = urlParsed ? urlParsed.host : process.env.PG_HOST
  export const port = urlParsed ? urlParsed.port : process.env.PG_PORT
  export const user = urlParsed ? urlParsed.user : process.env.PG_USER
  export const password = urlParsed ? urlParsed.password : process.env.PG_PASSWORD
  export const database = urlParsed ? urlParsed.database : process.env.PG_DATABASE
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
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  }
}

export const AppKey = {
  APP_KEY: process.env.APP_KEY || 'secret',
}

export default { Database, Knex, AppKey }
