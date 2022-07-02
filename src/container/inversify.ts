import { Container } from 'inversify'

import { IUser } from '@interfaces/user.interface'
import UsersRepository from '@repositories/users.repository'
import UserResolver from '@resolvers/user.resolver'

import TYPES from '@container/types'

const container = new Container({ skipBaseClassChecks: true })

/** user containers */
container.bind<IUser.Repository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope()
container.bind<UserResolver>(UserResolver).to(UserResolver).inSingletonScope()

export default container
