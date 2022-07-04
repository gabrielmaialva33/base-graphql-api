import { injectable } from 'inversify'

import db from '@database/connection'
import BaseRepository from '@repositories/base.repository'
import { IUser } from '@interfaces/user.interface'
import UserEntity from '@entities/user.entity'

@injectable()
export default class UsersRepository extends BaseRepository implements IUser.Repository {
  constructor() {
    super(db)
  }

  public async list(): Promise<UserEntity[]> {
    return this.db.select('*').from('users')
  }

  public async store(data: Partial<UserEntity>): Promise<UserEntity> {
    const [{ id }] = await this.db<UserEntity>('users').insert(data).returning('id')
    return this.db.select('*').from('users').where('id', id).first<UserEntity>()
  }
}
