import { ItemProps } from ".";

export interface PaginationProps {
  data: ItemProps[];
  currentPage: number;
  contactsPerPage: number;
  indexOfFirstContact : number;
  indexOfLastContact: number;
  paginate: (pageNumber: number) => void;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
}