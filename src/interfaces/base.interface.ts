import { IWithPagination } from '@libs/pagination.interfaces'

export namespace IBase {
  export interface Repository<Entity> {
    /**
     * List all entities
     */
    list(params?: Params.List): Promise<IWithPagination<Entity>>

    /**
     * Store a new entity
     */
    store(data: Partial<Entity>): Promise<Entity>

    /**
     * Find an entity by column value
     */
    findBy(column: string, value: any): Promise<Entity | null>
  }

  export namespace Params {
    export interface List {
      page?: number
      perPage?: number
    }
  }
}
