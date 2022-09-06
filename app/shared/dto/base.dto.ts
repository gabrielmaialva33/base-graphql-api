import { Field, InputType } from 'type-graphql'

import UserEntity from 'app/modules/accounts/entities/user.entity'
import { Exists } from 'app/shared/validators'

export namespace DTO {
  @InputType({ isAbstract: true, description: 'Base get input type' })
  export class Get {
    @Field((_type) => String, { nullable: false, description: 'User id' })
    @Exists(UserEntity.tableName, { message: 'This user not exists or not available' })
    public id!: string
  }
}
