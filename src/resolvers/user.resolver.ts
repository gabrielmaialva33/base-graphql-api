import { Query, Resolver } from 'type-graphql'
import UserEntity from '@entities/user.entity'

import { IUser } from '@interfaces/user.interface'
import { inject, injectable } from 'inversify'
import TYPES from '../container/types'

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
