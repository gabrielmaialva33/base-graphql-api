import { inject, injectable } from 'inversify'
import { Resolver, Mutation, Arg } from 'type-graphql'
import argon2 from 'argon2'

import { IUser } from '@interfaces/user.interface'
import UserEntity, { AuthEntity } from '@entities/user.entity'
import { RegisterPayload } from '@entities/dto/user.dto'

import TYPES from '@container/types'
import { generateToken } from '@utils/jwt'

@injectable()
@Resolver((_of) => UserEntity)
export default class AuthResolver {
  constructor(
    @inject(TYPES.UsersRepository)
    private readonly usersRepository: IUser.Repository
  ) {}

  @Mutation(() => AuthEntity, { name: 'registerUser', description: 'Register a new user' })
  public async register(@Arg('data', { validate: true }) data: RegisterPayload) {
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
