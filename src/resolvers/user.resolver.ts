import { inject, injectable } from 'inversify'
import { Arg, Query, Resolver } from 'type-graphql'

import { IUser } from '@interfaces/user.interface'
import UserEntity, { UserPaginated } from '@entities/user.entity'
import { GetUserPayload } from '@entities/dto/user.dto'
import { PaginationParams } from '@libs/pagination.dto'

import TYPES from '@container/types'

@injectable()
@Resolver((_of) => UserEntity)
export default class UserResolver {
  constructor(
    @inject(TYPES.UsersRepository)
    private readonly usersRepository: IUser.Repository
  ) {}

  @Query((_type) => UserPaginated)
  public async list(@Arg('params') { page, per_page: perPage }: PaginationParams) {
    return this.usersRepository.list({ page, perPage })
  }

  @Query((_type) => UserEntity)
  public async get(@Arg('payload', { validate: true }) { id: userId }: GetUserPayload) {
    return this.usersRepository.findBy('id', userId)
  }
}
