export interface IPaginateParams {
  per_page?: number
  current_page?: number
  is_from_start?: boolean
  is_length_aware?: boolean
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

export type IPagination<TParams> = TParams extends
  | { current_page: 1 }
  | { is_from_start: true }
  | { is_length_aware: true }
  ? ILengthAwarePagination
  : IBasePagination

export interface IWithPagination<Data, TParams = IPaginateParams> {
  data: Array<Data>
  meta: IPagination<TParams>
}
