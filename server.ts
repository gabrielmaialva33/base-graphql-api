import 'reflect-metadata'

import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'

import container from 'app/shared/container/inversify'

import UserResolver from 'app/modules/accounts/resolvers/user.resolver'
import AuthResolver from 'app/modules/accounts/resolvers/auth.resolver'
import RoleResolver from 'app/modules/accounts/resolvers/role.resolver'

import { LOG } from 'utils/log'

export const Schemas = async () => {
  return await buildSchema({
    resolvers: [UserResolver, AuthResolver, RoleResolver],
    container,
  })
}

export const startApolloServer = async () => {
  const server = new ApolloServer({
    schema: await Schemas(),
    context: ({ req, res }) => ({ req, res }),
  })

  return server
    .listen({
      host: process.env.HOST,
      port: process.env.PORT || 4000,
    })
    .then(({ url }) => LOG('info', `🚀 Server is running, GraphQL Playground available at ${url}`))
}

startApolloServer().then(() => LOG('info', '🚀 Server is running now!'))
