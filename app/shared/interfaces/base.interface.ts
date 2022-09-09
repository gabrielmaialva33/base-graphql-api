import { IWithPagination } from 'libs/pagination.interfaces'

export namespace IBase {
  export interface Repository<Entity> {
    /**
     * List all entities
     */
    list(params?: DTO.List<Entity>): Promise<IWithPagination<Entity>>

    /**
     * Store a new entity
     */
    store(data: Partial<Entity>): Promise<Entity>

    /**
     * Save an existing entity
     */
    save(entityId: string, data: DTO.Save<Entity>): Promise<Entity>

    /**
     * Find an entity by column value
     */
    findBy({ column, value }: DTO.Get<Entity>): Promise<Entity | null>
  }

  export namespace DTO {
    export type List<Entity> = {
      page?: number
      perPage?: number
      sortBy?: keyof Entity | string
      direction?: 'ASC' | 'DESC'
    }

    export type Get<Entity> = {
      column: keyof Entity | Array<keyof Entity | string> | string
      value: any
    }

    export type Save<Entity> = Partial<Entity>
  }
}
