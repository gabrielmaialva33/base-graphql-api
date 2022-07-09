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

  public store(data: Partial<UserEntity>) {
    return super.store(data)
  }
}
