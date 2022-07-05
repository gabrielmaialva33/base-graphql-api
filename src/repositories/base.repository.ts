import { Knex } from 'knex'

export default abstract class BaseRepository {
  protected constructor(protected orm: Knex) {}
}
