export interface ResponseBase<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface PagedResult<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}
