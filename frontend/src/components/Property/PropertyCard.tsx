import React from "react";
import { FaStar } from "react-icons/fa6";
import AgentCard from "../Agent/AgentCard";
import { Property } from "../../store/types";
import { useNavigate } from "react-router-dom";

type PropertyCardProps = {
  property: Property;
  totalReviews: number;
  averageRatings: number;
};

const PropertyCardPhotos = ({ property }: { property: Property }) => {
  return (
    <div
      id="property-card"
      className="h-80 w-full shadow-md rounded-lg bg-center bg-cover bg-no-repeat relative "
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
    <div id="property-details" className="mt-2">
      <div className="flex justify-between mt-2">
        <p className="font-primary font-semibold text-lg leading-none mt-1">
          {property.name}
        </p>
        <div className="flex gap-1">
          {totalReviews >= 1 && <FaStar className="text-sm " />}
          <p className="font-light text-base leading-none break-words">
            {totalReviews === 0
              ? ""
              : `${averageRatings.toPrecision(3)} (${totalReviews})`}
          </p>
        </div>
      </div>
      <p className="font-light text-base text-gray-600">{property.location}</p>
      <p className="font-semibold text-base mt-2">
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
  const navigateTo = useNavigate();

  const handlePropertyClick = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    id: string,
  ) => {
    const target = e.target as HTMLDivElement;

    if (e.type === "keydown" || e.type === "click") {
      if (target.id === "agent-card" || target.id === "agent-photo") {
        return;
      }
      if (
        target.id === "property-card" ||
        target.closest("#property-details")
      ) {
        navigateTo(`/property/${id}`);
      }
    }
  };

  if (!property) {
    return null;
  }

  return (
    <div
      className="w-full"
      onClick={e => handlePropertyClick(e, property.id)}
      onKeyDown={e => {
        if (e.key === "Enter") {
          handlePropertyClick(e, property.id);
        }
      }}
      role="button"
      tabIndex={0}>
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
