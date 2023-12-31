import React from "react";

interface PaginationProps {
  pagination: {
    prev?: {
      page: number;
      limit: number;
    };
    next?: {
      page: number;
      limit: number;
    };
  };
  onPageChange: (page: number) => void;
}

const Pagination = ({ pagination, onPageChange }: PaginationProps) => {
  const handlePageChange = (page: number | undefined) => {
    if (page !== undefined) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex gap-2 mt-2 justify-end">
      {pagination.prev && (
        <button
          className="text-sm border border-accent rounded-md text-accent py-1 px-3"
          onClick={() => handlePageChange(pagination.prev?.page)}>
          Previous
        </button>
      )}
      {pagination.next && (
        <button
          className="text-sm bg-accent rounded-md text-white py-1 px-3"
          onClick={() => handlePageChange(pagination.next?.page)}>
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
