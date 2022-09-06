export interface IPaginateParams {
  per_page?: number
  current_page?: number
  from_start?: boolean
}

export interface IBasePagination {
  current_page: number
  per_page: number
  from: number
  to: number
}

export interface ILengthAwarePagination extends IBasePagination {
  total: number
  last_page: number
}

export type IPagination<TParams> = TParams extends { current_page: 1 } | { from_start: true }
  ? ILengthAwarePagination
  : IBasePagination

export interface IWithPagination<Data, TParams = IPaginateParams> {
  data: Array<Data>
  meta: IPagination<TParams>
}
