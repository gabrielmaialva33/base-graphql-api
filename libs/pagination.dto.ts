import { InputType, Field } from 'type-graphql'

@InputType()
export class PaginationParams {
  @Field((_type) => Number, { nullable: true, defaultValue: 1 })
  public page?: number

  @Field((_type) => Number, { nullable: true, defaultValue: 10 })
  public per_page?: number
}
