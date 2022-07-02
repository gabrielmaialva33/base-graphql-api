import { Container } from 'inversify'

import TYPES from './types'

import { IUser } from '@interfaces/user.interface'
import UsersRepository from '@repositories/users.repository'
import UsersService from 'src/services/users.service'
import UserResolver from '@resolvers/user.resolver'

const serviceContainer = new Container({ skipBaseClassChecks: true })

serviceContainer
  .bind<IUser.Repository>(TYPES.UsersRepository)
  .to(UsersRepository)
  .inSingletonScope()

serviceContainer.bind<IUser.Service>(TYPES.UsersService).to(UsersService).inSingletonScope()
serviceContainer.bind<UserResolver>(UserResolver).to(UserResolver).inSingletonScope()

export default serviceContainer
