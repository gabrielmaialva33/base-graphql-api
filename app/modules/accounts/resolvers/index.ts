import AuthResolver from 'app/modules/accounts/resolvers/auth.resolver'
import RoleResolver from 'app/modules/accounts/resolvers/role.resolver'
import UserResolver from 'app/modules/accounts/resolvers/user.resolver'

const Resolvers = [() => AuthResolver, () => RoleResolver, () => UserResolver]

export default Resolvers
