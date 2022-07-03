import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { inject, injectable } from 'inversify'

import { IUser } from '@interfaces/user.interface'
import { UserDTO } from '@entities/./dto/user.dto'
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
    return this.usersRepository.list()
  }

  @Mutation(() => UserEntity)
  public async store(@Arg('data', { validate: true }) data: UserDTO.Store) {
    return this.usersRepository.store({ ...data })
  }
}
