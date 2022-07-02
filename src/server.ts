import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'

import { LOG } from '@utils/log'
import db from './db/connection'
import { Schemas } from '@resolvers/index'

export const startApolloServer = async () => {
  const server = new ApolloServer({
    schema: await Schemas(),
    context: ({ req, res }) => ({ req, res, db }),
  })

  return server.listen().then(({ url }) => LOG('info', `🚀 Server ready at ${url}`))
}

startApolloServer()
