import UserEntity from '@entities/user.entity'

namespace UserInterface {
  export interface Repository {
    list(page: number, perPage: number): Promise<any>

    store(data: Partial<UserEntity>): Promise<UserEntity>
  }
}

export { UserInterface as IUser }
