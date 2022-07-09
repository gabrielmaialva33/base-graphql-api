import UserEntity from '@entities/user.entity'
import { IWithPagination } from '@libs/pagination.interfaces'

namespace UserInterface {
  export interface Repository {
    list(params?: Params.List): Promise<IWithPagination<UserEntity>>

    store(data: Partial<UserEntity>): Promise<UserEntity>
  }

  export namespace Params {
    export interface List {
      page?: number
      perPage?: number
    }
  }
}

export { UserInterface as IUser }
