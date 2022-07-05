import UserEntity from '@entities/user.entity'
import { IWithPagination } from 'knex-paginate'

namespace UserInterface {
  export interface Repository {
    list(
      page: number,
      perPage: number
    ): Promise<IWithPagination<UserEntity, { perPage: number; currentPage: number }>>

    store(data: Partial<UserEntity>): Promise<UserEntity>
  }
}

export { UserInterface as IUser }
