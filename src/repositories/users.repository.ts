import { injectable } from 'inversify'

import db from '@database/connection'
import { IUser } from '@interfaces/user.interface'
import UserEntity from '@entities/user.entity'
import BaseRepository from '@repositories/base.repository'

@injectable()
export default class UsersRepository
  extends BaseRepository<UserEntity>
  implements IUser.Repository
{
  constructor() {
    super(db, UserEntity.tableName)
  }
}
