import { inject, injectable } from 'inversify'
import { Resolver, Mutation, Arg } from 'type-graphql'
import argon2 from 'argon2'

import { IUser } from 'app/modules/accounts/interfaces/user.interface'
import UserEntity from 'app/modules/accounts/entities/user.entity'
import { UserDTO } from 'app/modules/accounts/dto/user.dto'

import TYPES from 'app/shared/container/types'
import { generateToken } from 'utils/jwt'

@injectable()
@Resolver((_of) => UserEntity)
export default class AuthResolver {
  constructor(
    @inject(TYPES.UsersRepository)
    private readonly usersRepository: IUser.Repository
  ) {}

  @Mutation(() => UserDTO.Auth, { name: 'registerUser', description: 'Register a new user' })
  public async register(@Arg('user', { validate: true }) data: UserDTO.Store) {
    const { first_name, last_name, email, username, password } = data

    const user = await this.usersRepository.store({
      first_name,
      last_name,
      email,
      username,
      password_hash: await argon2.hash(password),
    })

    return { token: generateToken(user), user }
  }
}
