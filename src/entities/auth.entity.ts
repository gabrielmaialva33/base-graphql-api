import { ObjectType, Field } from 'type-graphql'

import UserEntity from '@entities/user.entity'

@ObjectType()
export default class AuthEntity {
  @Field()
  public token!: string

  @Field(() => UserEntity)
  public user!: UserEntity
}
