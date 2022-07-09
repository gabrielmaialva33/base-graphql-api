import { InputType, Field } from 'type-graphql'
import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator'

import { Unique } from '@validators/unique'
import { Exists } from '@validators/exists'

import UserEntity from '@entities/user.entity'

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
  @Unique(UserEntity.tableName, { message: 'This users is already taken' })
  public username!: string

  @Field()
  @MinLength(6)
  public password!: string
}

@InputType()
export class EditUserPayload implements Partial<UserEntity> {
  @Field({ nullable: true })
  @MaxLength(80)
  @MinLength(2)
  public first_name?: string

  @Field({ nullable: true })
  @MaxLength(80)
  @MinLength(2)
  public last_name?: string

  @Field({ nullable: true })
  @IsEmail()
  @MaxLength(255)
  @Unique('users', { message: 'This email is already taken' })
  public email?: string

  @Field({ nullable: true })
  @Matches(/^\w{2,30}$/, {
    message:
      'The username should only contains alphanumeric characters, underscores and should have a length between 2 to 30',
  })
  @Unique(UserEntity.tableName, { message: 'This users is already taken' })
  public username?: string

  @Field({ nullable: true })
  @MinLength(6)
  public password?: string
}

@InputType()
export class GetUserPayload {
  @Field((_type) => String)
  @Exists(UserEntity.tableName, { message: 'This user not exists or not available' })
  public id!: String
}
