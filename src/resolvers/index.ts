import { buildSchema } from 'type-graphql'

import UserResolver from '@resolvers/user.resolver'

import serviceContainer from '../container'

export const Schemas = async () => {
  return await buildSchema({
    resolvers: [UserResolver],
    container: serviceContainer,
  })
}
