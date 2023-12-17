import React from "react";
import { FaStar } from "react-icons/fa6";
import AgentCard from "../Agent/AgentCard";
import { Property } from "../../store/types";

type PropertyCardProps = {
  property: Property;
  totalReviews: number;
  averageRatings: number;
};

const PropertyCardPhotos = ({ property }: { property: Property }) => {
  return (
    <div
      className="h-56 w-full shadow-md rounded-lg bg-center bg-cover bg-no-repeat relative"
      style={{
        backgroundImage: `url('${property.photos[0]}')`,
      }}>
      <div className="absolute bottom-4 left-4">
        <AgentCard agentId={property.agent.id} photo={property.agent.photo} />
      </div>
    </div>
  );
};

const PropertyCardDetails = ({
  property,
  totalReviews,
  averageRatings,
}: PropertyCardProps) => {
  return (
    <div className="mt-2">
      <div className="flex justify-between mt-2">
        <p className="font-primary font-bold text-xs leading-none mt-1">
          {property.name}
        </p>
        <div className="flex gap-1">
          <FaStar className="text-[0.5rem] mt-[2px]" />
          <p className="font-light text-xs font-secondary leading-none break-words">
            {averageRatings} ({totalReviews})
          </p>
        </div>
      </div>
      <p className="font-secondary font-light text-xs  text-gray-700">
        {property.location}
      </p>
      <p className="font-secondary font-bold text-xs mt-2">
        ${property.price} <span className="font-normal">night</span>
      </p>
    </div>
  );
};

const PropertyCard = ({
  property,
  averageRatings,
  totalReviews,
}: PropertyCardProps) => {
  if (!property) {
    return null;
  }

  return (
    <div className="w-full">
      <PropertyCardPhotos property={property} />
      <PropertyCardDetails
        property={property}
        averageRatings={averageRatings}
        totalReviews={totalReviews}
      />
    </div>
  );
};

export default PropertyCard;
