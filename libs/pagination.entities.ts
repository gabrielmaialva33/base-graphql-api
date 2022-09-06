import { ObjectType, Field, ClassType } from 'type-graphql'

@ObjectType({ description: 'Pagination metadata', isAbstract: true })
export default abstract class MetaEntity {
  @Field((_type) => Number, { description: 'Total items' })
  public total!: number

  @Field((_type) => Number, { description: 'Last page' })
  public last_page!: number

  @Field((_type) => Number, { description: 'Items per page' })
  public per_page!: number

  @Field((_type) => Number, { description: 'Current page' })
  public current_page!: number

  @Field((_type) => String, { description: 'Sort by' })
  public sort_by!: string

  @Field((_type) => String, { description: 'Sort direction' })
  public direction!: 'ASC' | 'DESC'

  @Field((_type) => Number, { description: 'From' })
  public from!: number

  @Field((_type) => Number, { description: 'To' })
  public to!: number
}

export function Paginated<TEntity>(entity: ClassType<TEntity>) {
  @ObjectType({ isAbstract: true, description: 'Pagination' })
  abstract class PaginatedClass {
    @Field()
    public meta!: MetaEntity

    @Field((_type) => [entity])
    public data!: Array<TEntity>
  }
  return PaginatedClass
}
