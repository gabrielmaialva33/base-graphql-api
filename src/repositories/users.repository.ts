import { injectable } from 'inversify'

import { IUser } from '@interfaces/user.interface'
import UserEntity from '@entities/user.entity'
import BaseRepository from '@repositories/base.repository'

import db from '@database/connection'
import { IWithPagination } from '@libs/pagination.interfaces'

import Params = IUser.Params

@injectable()
export default class UsersRepository extends BaseRepository implements IUser.Repository {
  constructor() {
    super(db)
  }

  public async list({ page, perPage }: Params.List): Promise<IWithPagination<UserEntity>> {
    return this.orm<UserEntity>('users').paginate({ current_page: page, per_page: perPage })
  }

  public async store(data: Partial<UserEntity>): Promise<UserEntity> {
    const [{ id }] = await this.orm<UserEntity>('users').insert(data).returning('id')
    return this.orm.select('*').from('users').where('id', id).first<UserEntity>()
  }
}
