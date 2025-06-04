export interface PaginationResultInterface<PaginationEntity> {
  data: PaginationEntity[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  next: number;
  previous: number;
}
