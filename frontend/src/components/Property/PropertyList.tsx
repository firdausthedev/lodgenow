import React, { useState } from "react";
import PropertyCard from "./PropertyCard";

import { useGetAllPropertyQuery } from "../../store/api/propertyApi";
import Pagination from "./../Pagination";

const PropertyList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const { isLoading, error, data } = useGetAllPropertyQuery([
    limit,
    currentPage,
  ]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading || !data) {
    return (
      <div className="w-[800px] h-40 mx-auto m-5">
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-2">
            <div className="h-56 bg-slate-600 animate-pulse rounded-lg"></div>
            <div className="h-3 bg-slate-600 animate-pulse rounded-md w-1/2 "></div>
            <div className="h-3 bg-slate-600 animate-pulse rounded-md w-1/5 "></div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-56 bg-slate-600 animate-pulse rounded-lg"></div>
            <div className="h-3 bg-slate-600 animate-pulse rounded-md w-1/2 "></div>
            <div className="h-3 bg-slate-600 animate-pulse rounded-md w-1/5 "></div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-56 bg-slate-600 animate-pulse rounded-lg"></div>
            <div className="h-3 bg-slate-600 animate-pulse rounded-md w-1/2 "></div>
            <div className="h-3 bg-slate-600 animate-pulse rounded-md w-1/5 "></div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-56 bg-slate-600 animate-pulse rounded-lg"></div>
            <div className="h-3 bg-slate-600 animate-pulse rounded-md w-1/2 "></div>
            <div className="h-3 bg-slate-600 animate-pulse rounded-md w-1/5 "></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[800px] h-40 mx-auto m-5">
        <p className="font-secondary text-base">
          Error fetching data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="w-[800px] mx-auto m-5">
      <div className="grid grid-cols-3 gap-2">
        {data.data.map(property => {
          return (
            <PropertyCard
              key={property.id}
              property={property}
              averageRatings={property.averageRating}
              totalReviews={property.totalReviews}
            />
          );
        })}
      </div>

      <Pagination
        pagination={data.pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PropertyList;
