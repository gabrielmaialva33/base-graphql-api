import { ObjectType, Field } from 'type-graphql'

import { Paginated } from 'libs/pagination.entities'
import BaseEntity from 'app/shared/entities/base.entity'

@ObjectType()
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

  //todo - hidden password field
  public password_hash!: string
}

@ObjectType()
export class UserPaginated extends Paginated<UserEntity>(UserEntity) {}

@ObjectType()
export class AuthEntity {
  @Field()
  public token!: string

  @Field(() => UserEntity)
  public user!: UserEntity
}
