import BaseEntity from 'app/shared/entities/base.entity'
import { Field } from 'type-graphql'

export default class RoleEntity extends BaseEntity {
  public static readonly tableName = 'roles'

  constructor() {
    super(RoleEntity.tableName)
  }

  /**
   * ------------------------------------------------------
   * Fields
   * ------------------------------------------------------
   * - This fields are used for graphql
   */
  @Field()
  public name!: string

  @Field()
  public slug!: string

  @Field()
  public description!: string
}
