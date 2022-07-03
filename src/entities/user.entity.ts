import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export default class UserEntity {
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

  @Field()
  public password!: string

  @Field()
  public created_at!: Date

  @Field()
  public updated_at!: Date
}
