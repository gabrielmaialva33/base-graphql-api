import { inject, injectable } from 'inversify'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import argon2 from 'argon2'

import { IUser } from 'app/modules/accounts/interfaces/user.interface'
import UserEntity from 'app/modules/accounts/entities/user.entity'

import { PaginationDTO } from 'libs/pagination/pagination.dto'
import { ListUser, GetUser, EditUser } from 'app/modules/accounts/dto/user.dto'

import TYPES from 'app/shared/container/types'

@injectable()
@Resolver((_of) => UserEntity)
export default class UserResolver {
  constructor(
    @inject(TYPES.UsersRepository)
    private readonly usersRepository: IUser.Repository
  ) {}

  @Query((_type) => ListUser, {
    name: 'listUsers',
    description: 'List of users with pagination',
  })
  public async list(@Arg('params', { nullable: true }) params: PaginationDTO.Params) {
    return this.usersRepository.list(params || {})
  }

  @Query((_type) => UserEntity, { name: 'getUser', description: 'Get user by id' })
  public async get(@Arg('user', { validate: true, nullable: false }) { id: userId }: GetUser) {
    return this.usersRepository.findBy({ column: 'id', value: userId })
  }

  @Mutation((_type) => UserEntity, { name: 'editUser', description: 'Edit a existing user' })
  public async edit(@Arg('user', { validate: true }) user: EditUser) {
    const { id: userId, first_name, last_name, email, username, password } = user
    return this.usersRepository.save(userId, {
      first_name,
      last_name,
      email,
      username,
      password_hash: password ? await argon2.hash(password) : undefined,
    })
  }

  @Mutation((_type) => String, { name: 'deleteUser', description: 'Delete a existing user' })
  public async delete(@Arg('user', { validate: true }) { id: userId }: GetUser) {
    const user = await this.usersRepository.findBy({ column: 'id', value: userId })
    if (!user) throw new Error('This user not exists or not available')

    await this.usersRepository.save(userId, {
      email: `${user.email}-${Date.now()}`,
      username: `${user.username}-${Date.now()}`,
      is_deleted: true,
    })

    return 'User deleted'
  }
}
