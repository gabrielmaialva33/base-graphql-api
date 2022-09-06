import { ObjectType, Field, ClassType } from 'type-graphql'

@ObjectType()
export default class MetaEntity {
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

export function Paginated<TEntity>(entity: ClassType<TEntity>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedClass {
    @Field()
    public meta!: MetaEntity

    @Field((_type) => [entity])
    public data!: Array<TEntity>
  }
  return PaginatedClass
}
