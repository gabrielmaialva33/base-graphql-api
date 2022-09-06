import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export default abstract class BaseEntity {
  protected constructor(protected tableName: string) {
    this.tableName = tableName
  }

  @Field((_type) => ID, { name: 'id', nullable: false })
  public id!: string

  public is_deleted!: boolean

  @Field()
  public created_at!: Date

  @Field()
  public updated_at!: Date
}
