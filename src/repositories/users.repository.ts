import { injectable } from 'inversify'

import BaseRepository from '@repositories/base.repository'
import { IUser } from '@interfaces/user.interface'
import UserEntity from '@entities/user.entity'
import db from '@db/connection'

@injectable()
export default class UsersRepository extends BaseRepository implements IUser.Repository {
  constructor() {
    super(db)
  }

  public async list(): Promise<UserEntity[]> {
    return this.db.select('*').from('users')
  }

  public async store(data: Partial<UserEntity>): Promise<UserEntity> {
    return this.db.transaction(async (trx) => {
      const [{ id }] = await trx<UserEntity>('users').insert(data).returning('id')
      return (await this.db.select('*').from<UserEntity>('users').where('id', String(id)).first())!
    })
  }
}
