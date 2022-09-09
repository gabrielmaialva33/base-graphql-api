import { Field, InputType, ObjectType } from 'type-graphql'
import { MaxLength, MinLength } from 'class-validator'

import { Exists, Unique } from 'app/shared/validators'
import { Paginated } from 'libs/pagination/pagination.entities'
import RoleEntity from 'app/modules/accounts/entities/role.entity'

@ObjectType({ description: 'Role list' })
export class ListRole extends Paginated<RoleEntity>(RoleEntity) {}

@InputType({ description: 'Get role payload' })
export class GetRole {
  @Field((_type) => String, { nullable: false, description: 'Role id' })
  @Exists(RoleEntity.tableName, { message: 'This role not exists or not available' })
  public id!: string
}

@InputType({ description: 'Store role payload' })
export class StoreRole implements Partial<RoleEntity> {
  @Field()
  @MaxLength(30)
  @MinLength(4)
  @Unique(RoleEntity.tableName, { message: 'This role is already taken' })
  public slug!: string

  @Field()
  public description!: string
}

@InputType({ description: 'Edit role payload' })
export class EditRole implements Partial<RoleEntity> {
  @Field((_type) => String, { nullable: false, description: 'Role id' })
  @Exists(RoleEntity.tableName, { message: 'This role not exists or not available' })
  public id!: string

  @Field({ nullable: true })
  @MaxLength(30)
  @MinLength(4)
  @Unique(RoleEntity.tableName, { message: 'This role is already taken' })
  public slug?: string

  @Field({ nullable: true })
  public description?: string
}
