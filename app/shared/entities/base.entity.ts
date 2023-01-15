import { Model } from 'objection'
import { DateTime } from 'luxon'

import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType({ isAbstract: true, description: 'Base entity' })
export abstract class BaseEntity extends Model {
  @Field((_type) => ID, { name: 'id', nullable: false, description: 'The id of the entity' })
  public id!: string

  @Field((_type) => Boolean, {
    name: 'is_deleted',
    nullable: false,
    description: 'Soft delete boolean',
  })
  public is_deleted!: boolean

  @Field((_type) => Date, {
    name: 'created_at',
    nullable: false,
    description: 'The date the entity was created',
  })
  public created_at!: DateTime

  @Field((_type) => Date, {
    name: 'updated_at',
    nullable: false,
    description: 'The date the entity was last updated',
  })
  public updated_at!: DateTime

  @Field((_type) => Date, {
    name: 'deleted_at',
    nullable: true,
    description: 'The date the entity was deleted',
  })
  public deleted_at!: DateTime
}
