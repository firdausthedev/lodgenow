import React from "react";
import PropertyCard from "./PropertyCard";

import { useGetAllPropertyQuery } from "../../store/api/propertyApi";

const PropertyList = () => {
  const { isLoading, error, data } = useGetAllPropertyQuery(10);
  if (isLoading || !data) {
    return (
      <div className="w-[800px] h-40 mx-auto m-5 animate-pulse bg-slate-400 rounded-lg"></div>
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
    </div>
  );
};

export default PropertyList;
