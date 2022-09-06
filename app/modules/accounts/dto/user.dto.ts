import { InputType, Field } from 'type-graphql'
import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator'

import { Exists, Unique } from 'app/shared/validators'
import UserEntity from 'app/modules/accounts/entities/user.entity'

@InputType({ description: 'Get user payload' })
export class GetUserPayload {
  @Field((_type) => String, { nullable: false, description: 'User id' })
  @Exists(UserEntity.tableName, { message: 'This user not exists or not available' })
  public id!: String

  @Field((_type) => String, { nullable: true, description: 'User email' })
  public email?: String

  @Field((_type) => String, { nullable: true, description: 'User username' })
  public username?: String
}

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
  @Field((_type) => String, { nullable: false, description: 'User id' })
  @Exists(UserEntity.tableName, { message: 'This user not exists or not available' })
  public id!: string

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
