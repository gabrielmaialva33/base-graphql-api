import UserEntity from '@entities/user.entity'
import { IBase } from '@interfaces/base.interface'

namespace UserInterface {
  export interface Repository extends IBase.Repository<UserEntity> {}
}

export { UserInterface as IUser }
