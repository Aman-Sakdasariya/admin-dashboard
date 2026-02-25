import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [...Array(totalPages).keys()].map(num => num + 1);

  return (
    // 1. Added flex-col for mobile, sm:flex-row for desktop, and gap-4 for spacing
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-transparent py-3 mt-4">
      
      {/* 2. Centered text on mobile, left-aligned on desktop */}
      <div className="w-full sm:w-auto text-center sm:text-left">
        <p className="text-sm text-gray-700">
          Showing page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
        </p>
      </div>
      
      {/* 3. Added overflow-x-auto to handle many pages on very small screens without breaking layout */}
      <div className="w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 flex justify-center sm:justify-end">
        {/* w-max ensures the borders don't squish together when scrolling */}
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm w-max" aria-label="Pagination">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          {pages.map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                currentPage === page 
                  ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600' 
                  : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </nav>
      </div>
      
    </div>
  );
};

export default Pagination;