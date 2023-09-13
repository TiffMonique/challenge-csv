import { ItemProps } from ".";

export interface PaginationProps {
  data: ItemProps[];
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number; // number of siblings to show on each side of the current page
  currentPage: number;
  pageSize: number;
}
