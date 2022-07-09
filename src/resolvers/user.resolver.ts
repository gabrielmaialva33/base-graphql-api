import { inject, injectable } from 'inversify'
import { Arg, Query, Resolver } from 'type-graphql'

import { IUser } from '@interfaces/user.interface'
import UserEntity from '@entities/user.entity'
import { GetUserPayload, UserPagination } from '@entities/dto/user.dto'

import TYPES from '@container/types'
import { PaginationParams } from '@libs/pagination.dto'

@injectable()
@Resolver((_of) => UserEntity)
export default class UserResolver {
  constructor(
    @inject(TYPES.UsersRepository)
    private readonly usersRepository: IUser.Repository
  ) {}

  @Query(() => UserPagination)
  public async list(@Arg('params') { page, per_page: perPage }: PaginationParams) {
    return this.usersRepository.list({ page, perPage })
  }

  @Query(() => UserEntity)
  public async get(@Arg('payload', { validate: true }) { id }: GetUserPayload) {
    return this.usersRepository.findBy('id', id)
  }
}
