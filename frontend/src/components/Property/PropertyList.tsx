import React from "react";
import PropertyCard from "./PropertyCard";

import Pagination from "./../Pagination";
import { getAllPropertyResponse } from "./../../store/api/propertyApi";
import { Property } from "../../store/types";
import { useSelector } from "react-redux";
import { selectSearchTerm } from "../../store/slices/searchSlice";

interface PropertyListProps {
  data: getAllPropertyResponse | undefined;
  isLoading: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  isError: boolean;
  searchResult: Property[];
}

const PropertyList = ({
  data,
  isLoading,
  setCurrentPage,
  isError,
  searchResult,
}: PropertyListProps) => {
  const searchTerm = useSelector(selectSearchTerm);
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
          <div className="flex flex-col gap-2">
            <div className="h-56 bg-slate-600 animate-pulse rounded-lg"></div>
            <div className="h-3 bg-slate-600 animate-pulse rounded-md w-1/2 "></div>
            <div className="h-3 bg-slate-600 animate-pulse rounded-md w-1/5 "></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-[800px] h-40 mx-auto m-5">
        <p className="font-secondary text-base">
          Error fetching data. Please try again later.
        </p>
      </div>
    );
  }

  if (searchTerm) {
    if (searchTerm && searchResult.length === 0) {
      return (
        <div className="w-[800px] h-40 mx-auto m-5">
          <p className="font-secondary text-base">No property found.</p>
        </div>
      );
    } else {
      return (
        <div className="w-[800px] mx-auto m-5">
          <div className="grid grid-cols-3 gap-2">
            {searchResult.map(property => {
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
        </div>
      );
    }
  }

  if (data)
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
