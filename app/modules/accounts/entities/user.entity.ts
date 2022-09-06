import { ObjectType, Field } from 'type-graphql'

import BaseEntity from 'app/shared/entities/base.entity'

@ObjectType({ description: 'User entity' })
export default class UserEntity extends BaseEntity {
  public static readonly tableName = 'users'

  constructor() {
    super(UserEntity.tableName)
  }

  /**
   * ------------------------------------------------------
   * Fields
   * ------------------------------------------------------
   * - This fields are used for graphql
   */
  @Field()
  public first_name!: string

  @Field()
  public last_name!: string

  @Field()
  public email!: string

  @Field()
  public username!: string

  public password_hash!: string
}
