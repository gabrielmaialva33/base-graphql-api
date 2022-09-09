import { injectable, inject } from 'inversify'
import { Resolver, Query, Arg, Mutation } from 'type-graphql'

import { IRole } from 'app/modules/accounts/interfaces/role.interface'
import RoleEntity from 'app/modules/accounts/entities/role.entity'

import TYPES from 'app/shared/container/types'
import { PaginationDTO } from 'libs/pagination/pagination.dto'
import { ListRole, GetRole, StoreRole, EditRole } from 'app/modules/accounts/dto/role.dto'

@injectable()
@Resolver((_of) => RoleEntity)
export default class RoleResolver {
  constructor(
    @inject(TYPES.RolesRepository)
    private readonly roleRepository: IRole.Repository
  ) {}

  @Query((_type) => ListRole, {
    name: 'listRoles',
    description: 'List of roles with pagination',
  })
  public async list(@Arg('params', { nullable: true }) params: PaginationDTO.Params) {
    return this.roleRepository.list(params || {})
  }

  @Query((_type) => RoleEntity, { name: 'getRole', description: 'Get role by id' })
  public async get(@Arg('role', { validate: true, nullable: false }) { id: roleId }: GetRole) {
    return this.roleRepository.findBy({ column: 'id', value: roleId })
  }

  @Mutation((_type) => RoleEntity, { name: 'createRole', description: 'Create a new role' })
  public async create(@Arg('role', { validate: true }) role: StoreRole) {
    const { slug, description } = role

    return this.roleRepository.store({
      slug,
      name: slug.toLowerCase().trim(),
      description,
    })
  }

  @Mutation((_type) => RoleEntity, { name: 'editRole', description: 'Edit a role' })
  public async edit(@Arg('role', { validate: true }) role: EditRole) {
    const { id: roleId, slug, description } = role
    return this.roleRepository.save(roleId, {
      slug,
      name: slug ? slug.toLowerCase().trim() : undefined,
      description,
    })
  }

  @Mutation((_type) => String, { name: 'deleteRole', description: 'Delete a role' })
  public async delete(@Arg('role', { validate: true }) { id: roleId }: GetRole) {
    const role = await this.roleRepository.findBy({ column: 'id', value: roleId })
    if (!role) throw new Error('This role not exists or not available')

    await this.roleRepository.save(roleId, {
      slug: `${role.slug}-${Date.now()}`,
      name: `${role.name}-${Date.now()}`,
      is_deleted: true,
    })

    return 'Role deleted'
  }
}
