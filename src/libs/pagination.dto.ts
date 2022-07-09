import { InputType, Field } from 'type-graphql'
import { MinLength } from 'class-validator'

@InputType()
export class PaginationParams {
  @Field((_type) => Number, { nullable: true, defaultValue: 1 })
  @MinLength(1)
  public page?: number

  @Field((_type) => Number, { nullable: true, defaultValue: 10 })
  @MinLength(1)
  public per_page?: number
}
