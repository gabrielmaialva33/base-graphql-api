import { Container } from 'inversify'

import { IUser } from 'app/modules/accounts/interfaces/user.interface'
import UsersRepository from 'app/modules/accounts/repositories/users.repository'
import UserResolver from 'app/modules/accounts/resolvers/user.resolver'
import AuthResolver from 'app/modules/accounts/resolvers/auth.resolver'

import TYPES from 'app/shared/container/types'

const container = new Container({ skipBaseClassChecks: true })

/** user containers */
container.bind<IUser.Repository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope()
container.bind<UserResolver>(UserResolver).to(UserResolver).inSingletonScope()

container.bind<AuthResolver>(AuthResolver).to(AuthResolver).inSingletonScope()

export default container
