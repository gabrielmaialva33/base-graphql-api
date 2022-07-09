import { ObjectType, Field, ID } from 'type-graphql'
import { Paginated } from '@libs/pagination.entities'

@ObjectType()
export default class UserEntity {
  public static tableName: string = 'users'

  @Field((_type) => ID)
  public id!: string

  @Field()
  public first_name!: string

  @Field()
  public last_name!: string

  @Field()
  public email!: string

  @Field()
  public username!: string

  // - hidden
  public password_hash!: string

  @Field()
  public created_at!: Date

  @Field()
  public updated_at!: Date
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
