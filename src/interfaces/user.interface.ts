import UserEntity from '@entities/user.entity'

namespace UserInterface {
  export interface Repository {
    list(): Promise<UserEntity[]>

    store(data: Partial<UserEntity>): Promise<UserEntity>
  }
}

export { UserInterface as IUser }
