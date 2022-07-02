import UserEntity from '@entities/user.entity'

declare module UserInterface {
  export interface Repository {
    list(): Promise<UserEntity[]>
  }

  export interface Service {
    list(): Promise<UserEntity[]>
  }

  export interface DTO {}
}

export { UserInterface as IUser }
