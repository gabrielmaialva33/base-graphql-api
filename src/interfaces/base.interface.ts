import { IWithPagination } from '@libs/pagination.interfaces'

export namespace IBase {
  export interface Repository<Entity> {
    /**
     * List all entities
     */
    list({ page, perPage }?: DTO.List): Promise<IWithPagination<Entity>>

    /**
     * Store a new entity
     */
    store(data: Partial<Entity>): Promise<Entity>

    /**
     * Save an existing entity
     */
    save({ id, data }: DTO.Save<Entity>): Promise<Entity>

    /**
     * Find an entity by column value
     */
    findBy({ column, value }: DTO.Get<Entity>): Promise<Entity | null>
  }

  export namespace DTO {
    export interface List {
      page?: number
      perPage?: number
    }

    export interface Get<Entity> {
      column: Partial<Entity> | string
      value: any
    }

    export interface Save<Entity> {
      id: String
      data: Partial<Entity>
    }
  }
}
