import { IWithPagination } from '@libs/pagination.interfaces'

export namespace IBase {
  export interface Repository<Entity> {
    list(params?: Params.List): Promise<IWithPagination<Entity>>

    store(data: Partial<Entity>): Promise<Entity>
  }

  export namespace Params {
    export interface List {
      page?: number
      perPage?: number
    }
  }
}
