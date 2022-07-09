import { injectable } from 'inversify'

import { IUser } from '@interfaces/user.interface'
import UserEntity from '@entities/user.entity'
import BaseRepository from '@repositories/base.repository'

import db from '@database/connection'
import { IBase } from '@interfaces/base.interface'

import List = IBase.Params.List

@injectable()
export default class UsersRepository
  extends BaseRepository<UserEntity>
  implements IUser.Repository
{
  constructor() {
    super(db, 'users')
  }

  public list({ page, perPage }: List) {
    return super.list({ page, perPage })
  }

  public async store(data: Partial<UserEntity>): Promise<UserEntity> {
    const [{ id }] = await this.orm<UserEntity>('users').insert(data).returning('id')
    return this.orm.select('*').from('users').where('id', id).first<UserEntity>()
  }
}
