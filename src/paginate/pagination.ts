/**
 * Pagination class that handles paginated data responses
 * Provides standardized pagination functionality with:
 * - Results array containing paginated entities
 * - Current page number
 * - Page size (items per page)
 * - Total number of items
 * - Next and previous page numbers for navigation
 */
import { PaginationResultInterface } from 'src/paginate/pagination.results.interface';

export class Pagination<PaginationEntity> {
  /** Array of paginated results/entities */
  public data: PaginationEntity[];
  
  /** Current page number */
  public currentPage: number;
  
  /** Number of items per page */
  public pageSize: number;
  
  /** Total number of items across all pages */
  public totalItems: number;
  
  /** Next page number, if available */
  public next: number;
  
  /** Previous page number, if available */
  public previous: number;

  constructor(paginationResults: PaginationResultInterface<PaginationEntity>) {
    this.data = paginationResults.data;
    this.currentPage = paginationResults.currentPage;
    this.pageSize = paginationResults.pageSize;
    this.totalItems = paginationResults.totalItems;
    this.next = paginationResults.next;
    this.previous = paginationResults.previous;
  }
}
