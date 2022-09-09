import { ObjectType } from 'type-graphql'

import { Paginated } from 'libs/pagination.entities'
import RoleEntity from 'app/modules/accounts/entities/role.entity'

@ObjectType({ description: 'Role list' })
export class ListRole extends Paginated<RoleEntity>(RoleEntity) {}
