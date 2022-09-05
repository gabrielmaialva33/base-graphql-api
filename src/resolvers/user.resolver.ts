import { inject, injectable } from 'inversify'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import argon2 from 'argon2'

import { IUser } from '@interfaces/user.interface'
import UserEntity, { UserPaginated } from '@entities/user.entity'
import { EditUserPayload, GetUserPayload } from '@entities/dto/user.dto'
import { PaginationParams } from '@libs/pagination.dto'

import TYPES from '@container/types'

@injectable()
@Resolver((_of) => UserEntity)
export default class UserResolver {
  constructor(
    @inject(TYPES.UsersRepository)
    private readonly usersRepository: IUser.Repository
  ) {}

  @Query((_type) => UserPaginated, {
    name: 'listUsers',
    description: 'List of users with pagination',
  })
  public async list(@Arg('params') { page, per_page: perPage }: PaginationParams) {
    return this.usersRepository.list({ page, perPage })
  }

  @Query((_type) => UserEntity, { name: 'getUser', description: 'Get user by id' })
  public async get(@Arg('payload', { validate: true }) { id: userId }: GetUserPayload) {
    return this.usersRepository.findBy({ column: 'id', value: userId })
  }

  @Mutation((_type) => UserEntity, { name: 'editUser', description: 'Edit a existing user' })
  public async edit(@Arg('user', { validate: true }) user: EditUserPayload) {
    const { id, first_name, last_name, email, username, password } = user
    return this.usersRepository.save({
      id,
      data: {
        first_name,
        last_name,
        email,
        username,
        password_hash: password ? await argon2.hash(password) : undefined,
      },
    })
  }
}
