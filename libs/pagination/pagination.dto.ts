import { InputType, Field } from 'type-graphql'

export namespace PaginationDTO {
  @InputType({ description: 'Paginate params' })
  export class Params {
    @Field((_type) => Number, {
      description: 'Current page',
      nullable: true,
      defaultValue: 1,
    })
    public page?: number

    @Field((_type) => Number, {
      name: 'per_page',
      description: 'Items per page',
      nullable: true,
      defaultValue: 10,
    })
    public per_page?: number

    @Field((_type) => String, {
      name: 'sort_by',
      description: 'Sort by',
      nullable: true,
      defaultValue: 'id',
    })
    public sort_by?: string

    @Field((_type) => String, {
      nullable: true,
      defaultValue: 'ASC',
      description: 'Sort direction',
    })
    public direction?: 'ASC' | 'DESC' = 'ASC'
  }
}
