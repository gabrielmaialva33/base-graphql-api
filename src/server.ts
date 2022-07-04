import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'

import container from '@container/inversify'
import db from '@db/connection'

import UserResolver from '@resolvers/user.resolver'
import AuthResolver from '@resolvers/auth.resolver'

import { LOG } from '@utils/log'

export const Schemas = async () => {
  return await buildSchema({
    resolvers: [UserResolver, AuthResolver],
    container,
  })
}

export const startApolloServer = async () => {
  const server = new ApolloServer({
    schema: await Schemas(),
    context: ({ req, res }) => ({ req, res, db }),
  })

  return server
    .listen()
    .then(({ url }) => LOG('info', `🚀 Server is running, GraphQL Playground available at ${url}`))
}

startApolloServer()
