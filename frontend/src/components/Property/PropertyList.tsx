import React from "react";
import PropertyCard from "./PropertyCard";

import Pagination from "../layout/Pagination";
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

  const LoadingPanel = () => {
    return (
      <div className="flex flex-col gap-2">
        <div className="h-80 bg-loadingGray animate-pulse rounded-lg"></div>
        <div className="h-3 bg-loadingGray animate-pulse rounded-md w-1/2 "></div>
        <div className="h-3 bg-loadingGray animate-pulse rounded-md w-1/5 "></div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full h-40">
        <div className="grid grid-cols-3 gap-2">
          <LoadingPanel />
          <LoadingPanel />
          <LoadingPanel />
          <LoadingPanel />
          <LoadingPanel />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-40">
        <p className="text-base">
          Error fetching data. Please try again later.
        </p>
      </div>
    );
  }

  if (searchTerm) {
    if (searchTerm && searchResult.length === 0) {
      return (
        <div className="w-full h-40">
          <p className="text-base">No property found.</p>
        </div>
      );
    } else {
      return (
        <div className="w-full m-5">
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

  return (
    <main className="w-full mx-auto">
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
    </main>
  );
};

export default PropertyList;
