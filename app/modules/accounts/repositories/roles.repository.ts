import { injectable } from 'inversify'

import db from 'database/connection'
import { IRole } from 'app/modules/accounts/interfaces/role.interface'
import RoleEntity from 'app/modules/accounts/entities/role.entity'

import BaseRepository from 'app/shared/repositories/base.repository'

@injectable()
export default class RolesRepository
  extends BaseRepository<RoleEntity>
  implements IRole.Repository
{
  constructor() {
    super(db, RoleEntity.tableName)
  }
}
