import { PaginationProps } from '@/app/interfaces';
import React from 'react';

const Pagination = ({
  data,
  currentPage,
  paginate,
  goToPreviousPage,
  goToNextPage,
  contactsPerPage,
  indexOfFirstContact,
  indexOfLastContact,
}: PaginationProps) => {
  if (data.length === 0) {
    return null;
  }

  const totalPages = Math.ceil(data.length / contactsPerPage);
  const pageNumbers: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const displayPageNumbers = () => {
    if (totalPages <= 5) {
      return pageNumbers.map((number) => (
        <a
          key={number}
          href="#"
          onClick={() => paginate(number)}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === number
            ? 'bg-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
            }`}
        >
          {number}
        </a>
      ));
    } else {
      const pageButtons = [];
      const leftEllipsis = currentPage > 3;
      const rightEllipsis = currentPage < totalPages - 2;

      if (leftEllipsis) {
        pageButtons.push(
          <span
            key="left-ellipsis"
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
          >
            ...
          </span>
        );
      }

      const startPage = leftEllipsis ? currentPage - 1 : 1;
      const endPage = rightEllipsis ? currentPage + 1 : totalPages;

      for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
          <a
            key={i}
            href="#"
            onClick={() => paginate(i)}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === i
              ? 'bg-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
              : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              }`}
          >
            {i}
          </a>
        );
      }

      if (rightEllipsis) {
        pageButtons.push(
          <span
            key="right-ellipsis"
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
          >
            ...
          </span>
        );
      }

      return pageButtons;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            onClick={goToPreviousPage}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            onClick={goToNextPage}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{indexOfFirstContact + 1}</span> to{' '}
              <span className="font-medium">{Math.min(indexOfLastContact, data.length)}</span> of{' '}
              <span className="font-medium">{data.length}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <a
                href="#"
                onClick={goToPreviousPage}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === 1
                  ? 'text-gray-400'
                  : 'text-gray-900'
                  } ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
              >
                <span className="sr-only">Previous</span>
                Previous
              </a>
              {displayPageNumbers()}
              <a
                href="#"
                onClick={goToNextPage}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === totalPages
                  ? 'text-gray-400'
                  : 'text-gray-900'
                  } ring-1 ring-inset ring-gray-300 hover-bg-gray-50 focus:z-20 focus:outline-offset-0`}
              >
                <span className="sr-only">Next</span>
                Next
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
