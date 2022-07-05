import { Query, Resolver } from 'type-graphql'
import { inject, injectable } from 'inversify'

import { IUser } from '@interfaces/user.interface'
import UserEntity from '@entities/user.entity'

import TYPES from '@container/types'

@injectable()
@Resolver((_of) => UserEntity)
export default class UserResolver {
  constructor(
    @inject(TYPES.UsersRepository)
    private readonly usersRepository: IUser.Repository
  ) {}

  @Query(() => [UserEntity])
  public async list() {
    const users = await this.usersRepository.list(1, 10)
    console.log(users)
    return users
  }
}
