import { InputType, Field, ObjectType } from 'type-graphql'
import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator'

import { Unique } from '@validators/unique'
import UserEntity from '@entities/user.entity'
import { MetaEntity } from '@libs/pagination.entities'

@InputType()
export class RegisterPayload implements Partial<UserEntity> {
  @Field()
  @MaxLength(80)
  @MinLength(2)
  public first_name!: string

  @Field()
  @MaxLength(80)
  @MinLength(2)
  public last_name!: string

  @Field()
  @IsEmail()
  @MaxLength(255)
  @Unique('users', { message: 'This email is already taken' })
  public email!: string

  @Field()
  @Matches(/^\w{2,30}$/, {
    message:
      'The username should only contains alphanumeric characters, underscores and should have a length between 2 to 30',
  })
  @Unique('users', { message: 'This users is already taken' })
  public username!: string

  @Field()
  @MinLength(6)
  public password!: string
}

@ObjectType()
export class UserPagination {
  @Field((_type) => MetaEntity)
  public meta!: MetaEntity

  @Field((_type) => [UserEntity])
  public data!: UserEntity[]
}
