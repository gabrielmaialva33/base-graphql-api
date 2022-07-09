import UserEntity from '@entities/user.entity'
import { IBase } from '@interfaces/base.interface'

namespace UserInterface {
  export interface Repository extends IBase.Repository<UserEntity> {
    store(data: Partial<UserEntity>): Promise<UserEntity>
  }

  export namespace Params {}
}

export { UserInterface as IUser }
