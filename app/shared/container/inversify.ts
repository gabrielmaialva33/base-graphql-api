import { Container } from 'inversify'

import { IUser } from 'app/modules/accounts/interfaces/user.interface'
import { IRole } from 'app/modules/accounts/interfaces/role.interface'
import UsersRepository from 'app/modules/accounts/repositories/users.repository'
import RolesRepository from 'app/modules/accounts/repositories/roles.repository'

import UserResolver from 'app/modules/accounts/resolvers/user.resolver'
import AuthResolver from 'app/modules/accounts/resolvers/auth.resolver'

import TYPES from 'app/shared/container/types'
import RoleResolver from 'app/modules/accounts/resolvers/role.resolver'

const container = new Container({ skipBaseClassChecks: true })

/** accounts containers */
container.bind<IUser.Repository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope()
container.bind<IRole.Repository>(TYPES.RolesRepository).to(RolesRepository).inSingletonScope()

/** resolvers containers */
container.bind<UserResolver>(UserResolver).to(UserResolver).inSingletonScope()
container.bind<AuthResolver>(AuthResolver).to(AuthResolver).inSingletonScope()
container.bind<RoleResolver>(RoleResolver).to(RoleResolver).inSingletonScope()

export default container
