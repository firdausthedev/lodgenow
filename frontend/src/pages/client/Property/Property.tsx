import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetOnePropertyQuery } from "../../../store/api/propertyApi";
import Spinner from "../../../components/layout/Spinner";
import { SERVER_ERROR_MSG } from "./../../../components/utils/constants";
import { Property } from "../../../store/types";
import { FaCircle, FaStar } from "react-icons/fa6";
import AgentModal from "../../../components/Agent/AgentModal";
import ReviewCard from "../../../components/Review/ReviewCard";
import BookingCard from "../../../components/Booking/BookingCard";

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

  const PropertyGallery = ({ photos }: { photos: string[] }) => {
    return (
      <div className="flex h-[32rem] gap-2">
        <div
          className="bg-center bg-cover bg-no-repeat rounded-tl-3xl rounded-bl-3xl brightness-90 flex w-1/2 -mt-2"
          style={{ backgroundImage: `url('${photos[0]}')` }}
        />
        <div className="flex w-1/2 flex-wrap gap-4">
          {photos.map((photo, index) => {
            if (photos.length === 1) return null;
            index = index + 1;
            return (
              <div
                key={index}
                className={`bg-center bg-cover bg-no-repeat flex w-1/2 h-1/2 brightness-90 -mr-2 -mt-2 ${
                  index === 2 && "rounded-tr-3xl"
                } ${index === 4 && "rounded-br-3xl"}`}
                style={{ backgroundImage: `url('${photos[index]}')` }}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const PropertyDetails = ({ property }: { property: Property }) => {
    return (
      <div className="pb-8 flex flex-col">
        <h2 className="font-primary text-3xl font-medium">
          {property.location}
        </h2>
        <p className="font-secondary text-lg font-light">
          {property.bathrooms} bedrooms
          <FaCircle className="inline text-[0.2rem] mx-2" />
          {property.bedrooms} bathrooms
        </p>
        <p
          className={`font-secondary text-lg ${
            property.totalReviews === 0 ? "font-light" : "font-medium"
          }`}>
          <FaStar className="inline -mt-1 mr-1" />
          {property.totalReviews === 0 && "No reviews yet"}
          {property.totalReviews >= 1 && (
            <>
              {property.averageRating.toPrecision(3)}
              <FaCircle className="inline text-[0.2rem] mx-1" />
              <a href="#reviews" className="underline cursor-pointer">
                {property.totalReviews} reviews
              </a>
            </>
          )}
        </p>
      </div>
    );
  };

  const PropertyAgent = ({ property }: { property: Property }) => {
    const [isModal, setIsModal] = useState(false);
    return (
      <>
        <div className="py-8 border-t-2 border-b-2 border-gray-300/30 flex gap-4 items-center w-full h-fit">
          <button
            onClick={() => setIsModal(true)}
            className="bg-top bg-cover bg-no-repeat  brightness-90 h-16 w-16 rounded-full"
            style={{ backgroundImage: `url('${property.agent.photo}')` }}
          />
          <h3 className="font-primary text-lg font-medium">
            Stay with {property.agent.name}
          </h3>
        </div>
        {isModal && (
          <AgentModal agentId={property.agentId} setIsModal={setIsModal} />
        )}
      </>
    );
  };

  return (
    <main className="container">
      <div className="my-8">
        <h1 className="font-primary text-4xl font-medium">
          {property.data.name}
        </h1>
      </div>
      <PropertyGallery photos={property.data.photos} />
      <div className="flex pb-8 gap-20 h-[20rem]">
        <div className="w-full mt-8 ">
          <PropertyDetails property={property.data} />
          <PropertyAgent property={property.data} />
        </div>
        <BookingCard property={property.data} />
      </div>
      <div id="reviews" className="flex gap-8 pb-8">
        {property.data.reviews.map(review => {
          return <ReviewCard key={review.id} review={review} />;
        })}
      </div>
    </main>
  );
};

export default PropertyPage;
