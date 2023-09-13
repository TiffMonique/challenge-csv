import { usePagination } from '@/app/hooks';
import { PaginationProps } from '@/app/interfaces';

const Pagination = ({
  data,
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: PaginationProps) => {
  if (data.length === 0) {
    return null;
  }

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (!paginationRange || currentPage === 0 || paginationRange.length < 2) {
    return null;
  }


  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            onClick={onPrevious}
            className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 ${currentPage === 1
              ? 'pointer-events-none'
              : 'hover:bg-gray-50'
              }`}
          >
            Previous
          </a>
          <a
            href="#"
            onClick={onNext}
            className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 ${currentPage === totalCount
              ? 'pointer-events-none'
              : 'hover:bg-gray-50'
              }`}
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            {/* <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{indexOfFirstContact + 1}</span> to{' '}
              <span className="font-medium">{Math.min(indexOfLastContact, data.length)}</span> of{' '}
              <span className="font-medium">{data.length}</span> results
            </p> */}
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <a
                href="#"
                onClick={onPrevious}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === 1
                  ? 'text-gray-400 pointer-events-none'
                  : 'text-gray-900'
                  } ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
              >
                <span className="sr-only">Previous</span>
                Previous
              </a>
              {paginationRange.map((pageNumber, index) => (

                <div key={index}>
                  {
                    pageNumber === '...' ? (
                      <span
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                      >
                        ...
                      </span>
                    ) : (
                      <a
                        href="#"
                        onClick={() => onPageChange(Number(pageNumber))}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === Number(pageNumber)
                          ? 'bg-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                          : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                          }`}
                      >
                        {pageNumber}
                      </a>

                    )
                  }
                </div>
              ))}
              <a
                href="#"
                onClick={onNext}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === lastPage
                  ? 'text-gray-400 pointer-events-none'
                  : 'text-gray-900'
                  } ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
              >
                <span className="sr-only">Next</span>
                Next
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Pagination;
