import { Field, ObjectType } from 'type-graphql'

import BaseEntity from 'app/shared/entities/base.entity'

@ObjectType({ description: 'Role entity' })
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
  public name!: string

  @Field({ description: 'Role slug' })
  public slug!: string

  @Field({ description: 'Description of role' })
  public description!: string
}
