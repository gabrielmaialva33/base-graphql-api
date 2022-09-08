import { IBase } from 'app/shared/interfaces/base.interface'
import RoleEntity from 'app/modules/accounts/entities/role.entity'

export namespace RoleInterface {
  export interface Repository extends IBase.Repository<RoleEntity> {}
}

export { RoleInterface as IRole }
