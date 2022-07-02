import { Container } from 'inversify'

import { IUser } from '@interfaces/user.interface'
import UsersRepository from '@repositories/users.repository'
import UsersService from 'src/services/users.service'
import UserResolver from '@resolvers/user.resolver'

import TYPES from '@container/types'

const container = new Container({ skipBaseClassChecks: true })

container.bind<IUser.Repository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope()
container.bind<IUser.Service>(TYPES.UsersService).to(UsersService).inSingletonScope()
container.bind<UserResolver>(UserResolver).to(UserResolver).inSingletonScope()

export default container
