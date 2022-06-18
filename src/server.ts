import express, { Express } from 'express'
import http from 'http'
import { ApolloServer } from 'apollo-server-express'
import { IResolvers, TypeSource } from '@graphql-tools/utils'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'

import Schemas from '@schemas/index'
import Resolvers from '@resolvers/index'
import { LOG } from '@utils/log'

async function startApolloServer(schema: TypeSource, resolvers: IResolvers): Promise<void> {
  const app: Express = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()
  server.applyMiddleware({ app })

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve)).then(() => {
    LOG('info', `🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  })
}

startApolloServer(Schemas, Resolvers)
