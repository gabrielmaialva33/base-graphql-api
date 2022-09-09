export interface IPaginateParams {
  perPage?: number
  currentPage?: number
  sortBy?: string
  direction?: 'ASC' | 'DESC'
  fromStart?: boolean
}

export interface IBasePagination {
  currentPage: number
  perPage: number
  from: number
  to: number
}

export interface ILengthAwarePagination extends IBasePagination {
  total: number
  lastPage: number
}

export type IPagination<TParams> = TParams extends { currentPage: 1 } | { fromStart: true }
  ? ILengthAwarePagination
  : IBasePagination

export interface IWithPagination<Data, TParams = IPaginateParams> {
  data: Array<Data>
  meta: IPagination<TParams>
}
