import { ApolloError } from 'apollo-server'

export default class NotFoundException extends ApolloError {
  constructor(message: string) {
    super(message, 'NOT_FOUND')
  }
}
