import { injectable } from 'inversify'

import db from 'database/connection'
import { IUser } from 'app/modules/accounts/interfaces/user.interface'
import UserEntity from 'app/modules/accounts/entities/user.entity'
import BaseRepository from 'app/shared/repositories/base.repository'

@injectable()
export default class UsersRepository
  extends BaseRepository<UserEntity>
  implements IUser.Repository
{
  constructor() {
    super(db, UserEntity.tableName)
  }
}
