import React from "react";
import { createPortal } from "react-dom";
import { FaXmark, FaStar, FaCheck, FaEnvelope } from "react-icons/fa6";

import { getAgentResponse, useGetAgentQuery } from "../../store/api/agentApi";
import { Property } from "../../store/types";
import { useNavigate } from "react-router-dom";

interface AgentModalProps {
  agentId: string;
  setIsModal: (isModal: boolean) => void;
}

interface dataProps {
  data: getAgentResponse;
}

interface AgentPropertiesProps {
  index: number;
  numberOfProperties: number;
  property: Property;
}

const AgentProfileCard = ({ data }: dataProps) => {
  return (
    <div className="w-full bg-white  rounded-lg shadow-lg p-4 flex">
      <div className="w-full flex justify-center items-center flex-col gap-1">
        <div
          className="h-32 w-32 shadow-md rounded-full bg-top bg-cover bg-no-repeat relative"
          style={{ backgroundImage: `url('${data.data.photo}')` }}>
          <FaCheck
            aria-hidden="true"
            className="text-base absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 w-8 h-8 text-white"
          />
        </div>
        <p className="font-bold font-primary">{data.data.name}</p>
      </div>
      <div className="min-w-[7rem] flex flex-col gap-1 justify-center">
        <div className="flex flex-col gap-1">
          <div>
            <p className="font-bold text-3xl font-primary leading-none break-words">
              {data.data.totalReviews}
            </p>
            <p className="font-secondary text-sm -mt-1">Reviews</p>
          </div>
          <hr />
        </div>
        <div>
          <div>
            <div className="flex items-center gap-1">
              <p className="font-bold text-3xl font-primary leading-none mt-2 break-words">
                {data.data.averageRating.toPrecision(3)}
              </p>
              <FaStar className="text-sm" />
            </div>
            <p className="font-secondary text-sm -mt-1">Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AgentContactDetail = ({ data }: dataProps) => {
  return (
    <div className="flex gap-2 items-center text-gray-900 text-xs">
      <FaEnvelope className="text-base" />
      <p className="font-secondary font-light break-words text-lg ">
        Email me : {data.data.email}
      </p>
    </div>
  );
};

const AgentListings = ({ data }: dataProps) => {
  const maxPropertiesToShow = 2;
  const numberOfProperties = data.data.properties.length;
  return (
    <div>
      <h2 className="font-primary text-lg">{data.data.name}&apos;s listings</h2>
      <div className="flex gap-2 w-full">
        {data.data.properties
          .slice(0, maxPropertiesToShow)
          .map((property, index) => (
            <AgentProperties
              key={property.id}
              index={index}
              numberOfProperties={numberOfProperties}
              property={property}
            />
          ))}
      </div>
    </div>
  );
};

const AgentProperties = ({
  index,
  numberOfProperties,
  property,
}: AgentPropertiesProps) => {
  const navigateTo = useNavigate();

  const handlePropertyClick = (id: string) => {
    navigateTo(`/property/${id}`);
  };

  return (
    <div
      key={index}
      className={`${numberOfProperties > 1 ? "w-full" : "w-1/2"}`}>
      <button
        onClick={() => handlePropertyClick(property.id)}
        className="h-40 w-full shadow-md rounded-md bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('${property.photos[0]}')`,
        }}
      />
      <div className="flex justify-between mt-2">
        <p className="font-primary font-bold text-sm leading-none mt-1">
          {property.name}
        </p>
        <div className="flex gap-1">
          <FaStar className="text-xs" />
          <p className="font-light text-sm font-secondary leading-none  break-words">
            {property.averageRating}
          </p>
        </div>
      </div>
      <p className="font-secondary font-light text-sm leading-none text-gray-700">
        {property.location}
      </p>
    </div>
  );
};

const AgentModal = ({ agentId, setIsModal }: AgentModalProps) => {
  const { isLoading, error, data } = useGetAgentQuery(agentId);

  if (isLoading) {
    return createPortal(
      <div
        aria-label="modal"
        className="fixed left-0 right-0 top-0 bottom-0 h-full w-full bg-black/40 flex justify-center items-center shadow-md">
        <div
          aria-label="modal-content"
          className="bg-brown-200 flex flex-col rounded-xl w-[25rem] h-3/4 p-4 gap-3">
          <button
            aria-label="close-modal"
            className="flex w-fit hover:bg-white/70 rounded-full p-3 transition-colors ease-in-out duration-200"
            onClick={() => setIsModal(false)}>
            <FaXmark aria-hidden="true" className="text-black text-base" />
          </button>
          <div className="h-32 w-full animate-pulse mx-auto bg-loadingGray rounded-lg"></div>
          <div className="h-20 w-1/2 animate-pulse  bg-loadingGray rounded-lg "></div>
          <div className="h-4 w-1/4 animate-pulse  bg-loadingGray rounded-lg "></div>
          <div className="h-20 w-1/2 animate-pulse  bg-loadingGray rounded-lg "></div>
          <div className="h-4 w-1/4 animate-pulse  bg-loadingGray rounded-lg "></div>
        </div>
      </div>,
      document.getElementById("modal") as HTMLElement,
    );
  }

  if (error || !data) {
    return createPortal(
      <div
        aria-label="modal"
        className="fixed left-0 right-0 top-0 bottom-0 h-full w-full bg-black/40 flex justify-center items-center shadow-md">
        <div
          aria-label="modal-content"
          className="bg-brown-200 flex flex-col rounded-xl w-[25rem] h-3/4 p-4 gap-3">
          <button
            aria-label="close-modal"
            className="flex w-fit hover:bg-white/70 rounded-full p-3 transition-colors ease-in-out duration-200"
            onClick={() => setIsModal(false)}>
            <FaXmark aria-hidden="true" className="text-black text-base" />
          </button>
          <div>
            <p className="font-secondary text-base">
              Error fetching agent. Please try again later.
            </p>
          </div>
        </div>
      </div>,
      document.getElementById("modal") as HTMLElement,
    );
  }

  return createPortal(
    <div
      aria-label="modal"
      className="fixed left-0 right-0 top-0 bottom-0 h-full w-full bg-black/40 flex justify-center items-center shadow-md">
      <div
        aria-label="modal-content"
        className="bg-brown-200 flex flex-col rounded-xl w-[25rem] h-3/4 p-4 gap-3">
        <button
          aria-label="close-modal"
          className="flex w-fit hover:bg-white/70 rounded-full p-3 transition-colors ease-in-out duration-200"
          onClick={() => setIsModal(false)}>
          <FaXmark aria-hidden="true" className="text-black text-base" />
        </button>
        <AgentProfileCard data={data} />
        <AgentContactDetail data={data} />
        <AgentListings data={data} />
      </div>
    </div>,
    document.getElementById("modal") as HTMLElement,
  );
};

export default AgentModal;
