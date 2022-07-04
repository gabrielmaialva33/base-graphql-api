import { inject, injectable } from 'inversify'
import { Resolver, Mutation, Arg } from 'type-graphql'
import argon2 from 'argon2'

import { IUser } from '@interfaces/user.interface'
import UserEntity from '@entities/user.entity'
import AuthEntity from '@entities/auth.entity'
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

  @Mutation(() => AuthEntity)
  public async register(@Arg('payload', { validate: true }) payload: RegisterPayload) {
    const { first_name, last_name, email, username, password } = payload

    const hash = await argon2.hash(password)
    const user = await this.usersRepository.store({
      first_name,
      last_name,
      email,
      username,
      password_hash: hash,
    })

    const token = generateToken(user)

    return { token, user }
  }
}
