import { Query, Resolver } from 'type-graphql'
import { inject, injectable } from 'inversify'

import { IUser } from '@interfaces/user.interface'
import UserEntity from '@entities/user.entity'

import TYPES from '@container/types'

@injectable()
@Resolver((_of) => UserEntity)
export default class UserResolver {
  constructor(
    @inject(TYPES.UsersService)
    private readonly usersService: IUser.Service
  ) {}

  @Query(() => [UserEntity])
  public async list() {
    return this.usersService.list()
  }
}
