import { injectable, inject } from 'inversify'
import { Resolver, Query, Arg } from 'type-graphql'

import { IRole } from 'app/modules/accounts/interfaces/role.interface'
import RoleEntity from 'app/modules/accounts/entities/role.entity'

import TYPES from 'app/shared/container/types'
import { PaginationDTO } from 'libs/pagination.dto'

@injectable()
@Resolver((_of) => RoleEntity)
export default class RoleResolver {
  constructor(
    @inject(TYPES.RolesRepository)
    private readonly roleRepository: IRole.Repository
  ) {}

  @Query((_type) => RoleEntity, { name: 'listRoles', description: 'List of roles with pagination' })
  public async list(@Arg('params', { nullable: true }) params: PaginationDTO.Params) {
    return this.roleRepository.list(params || {})
  }

  public async get() {}

  public async edit() {}

  public async delete() {}
}
