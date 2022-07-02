import { buildSchema } from 'type-graphql'

import UserResolver from '@resolvers/user.resolver'

import container from '@container/index'

export const Schemas = async () => {
  return await buildSchema({
    resolvers: [UserResolver],
    container,
  })
}
