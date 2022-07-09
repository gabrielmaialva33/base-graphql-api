import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class MetaEntity {
  @Field((_type) => Number)
  public total!: number

  @Field((_type) => Number)
  public last_page!: number

  @Field((_type) => Number)
  public per_page!: number

  @Field((_type) => Number)
  public current_page!: number

  @Field((_type) => Number)
  public from!: number

  @Field((_type) => Number)
  public to!: number
}
