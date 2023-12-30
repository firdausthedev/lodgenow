import React from "react";
import { useParams } from "react-router-dom";
import { useGetOnePropertyQuery } from "../../../store/api/propertyApi";
import Spinner from "../../../components/layout/Spinner";
import { SERVER_ERROR_MSG } from "./../../../components/utils/constants";

import ReviewCard from "../../../components/Review/ReviewCard";
import BookingCard from "../../../components/Booking/BookingCard";
import {
  PropertyGallery,
  PropertyDetails,
  PropertyAgent,
} from "../../../components/Property/PropertyPageItems";

interface ErrorResponse {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
}

const PropertyPage = () => {
  const { id } = useParams();
  const {
    data: property,
    error,
    isLoading,
    isError,
  } = useGetOnePropertyQuery(id);

  if (isLoading) {
    return (
      <main className="container mt-10 mx-auto flex justify-center">
        <Spinner />
      </main>
    );
  }

  if (isError || !property) {
    if (error) {
      const errorResponse = error as ErrorResponse;
      return (
        <main className="container mt-3">
          <p className="font-secondary text-base">
            {errorResponse.data.message}
          </p>
        </main>
      );
    } else {
      return (
        <main className="container mt-10 mx-auto flex justify-center">
          <p className="font-secondary text-base">{SERVER_ERROR_MSG}</p>
        </main>
      );
    }
  }

  return (
    <main className="container py-12">
      <h1 className="font-primary text-4xl font-medium mb-8">
        {property.data.name}
      </h1>
      <PropertyGallery photos={property.data.photos} />
      <div className="flex pb-8 gap-20 h-[20rem]">
        <div className="w-full mt-8 ">
          <PropertyDetails property={property.data} />
          <PropertyAgent property={property.data} />
        </div>
        <BookingCard property={property.data} />
      </div>
      <div id="reviews" className="flex flex-col gap-8 ">
        {property.data.reviews.map(review => {
          return <ReviewCard key={review.id} review={review} />;
        })}
      </div>
    </main>
  );
};

export default PropertyPage;
