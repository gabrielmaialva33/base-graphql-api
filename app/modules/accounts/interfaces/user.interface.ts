import { IBase } from 'app/shared/interfaces/base.interface'
import UserEntity from 'app/modules/accounts/entities/user.entity'

namespace UserInterface {
  export interface Repository extends IBase.Repository<UserEntity> {}
}

export { UserInterface as IUser }
