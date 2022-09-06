import { inject, injectable } from 'inversify'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import argon2 from 'argon2'

import { IUser } from 'app/modules/accounts/interfaces/user.interface'
import UserEntity from 'app/modules/accounts/entities/user.entity'
import { UserDTO } from 'app/modules/accounts/dto/user.dto'
import { PaginationDTO } from 'libs/pagination.dto'

import TYPES from 'app/shared/container/types'

@injectable()
@Resolver((_of) => UserEntity)
export default class UserResolver {
  constructor(
    @inject(TYPES.UsersRepository)
    private readonly usersRepository: IUser.Repository
  ) {}

  @Query((_type) => UserDTO.List, {
    name: 'listUsers',
    description: 'List of users with pagination',
  })
  public async list(@Arg('params', { nullable: true }) params: PaginationDTO.Params) {
    return this.usersRepository.list(params || {})
  }

  @Query((_type) => UserEntity, { name: 'getUser', description: 'Get user by id' })
  public async get(@Arg('user', { validate: true, nullable: false }) { id: userId }: UserDTO.Get) {
    return this.usersRepository.findBy({ column: 'id', value: userId })
  }

  @Mutation((_type) => UserEntity, { name: 'editUser', description: 'Edit a existing user' })
  public async edit(@Arg('user', { validate: true }) user: UserDTO.Edit) {
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
