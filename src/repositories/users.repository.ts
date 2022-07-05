import { injectable } from 'inversify'

import db from '@database/connection'
import BaseRepository from '@repositories/base.repository'
import { IUser } from '@interfaces/user.interface'
import UserEntity from '@entities/user.entity'
import { IWithPagination } from 'knex-paginate'

@injectable()
export default class UsersRepository extends BaseRepository implements IUser.Repository {
  constructor() {
    super(db)
  }

  public async list(
    page: number,
    perPage: number
  ): Promise<IWithPagination<UserEntity, { perPage: number; currentPage: number }>> {
    return this.orm<UserEntity>('users').paginate({ perPage: perPage, currentPage: page })
  }

  public async store(data: Partial<UserEntity>): Promise<UserEntity> {
    const [{ id }] = await this.orm<UserEntity>('users').insert(data).returning('id')
    return this.orm.select('*').from('users').where('id', id).first<UserEntity>()
  }
}
