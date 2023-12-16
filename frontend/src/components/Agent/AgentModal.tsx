import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaXmark, FaStar, FaCheck, FaEnvelope } from "react-icons/fa6";

import config from "../config";

import { Agent } from "./../../store/types";

interface AgentModalProps {
  agentId: string;
  setIsModal: (isModal: boolean) => void;
}

interface AgentProfileCardProps {
  agent: Agent;
  numberOfReviews: number;
  averageRating: number;
}

interface AgentResponse {
  success: boolean;
  data: Agent;
}

const calculateAverageRating = (ratings: number[]): number => {
  if (ratings.length === 0) {
    return 0;
  }

  const sumOfRatings = ratings.reduce((total, rating) => total + rating, 0);
  const numberOfReviews = ratings.length;

  const averageRating = sumOfRatings / numberOfReviews;

  return Number(averageRating.toFixed(3));
};

const AgentProfileCard = ({
  agent,
  numberOfReviews,
  averageRating,
}: AgentProfileCardProps) => {
  return (
    <div className="w-full bg-white  rounded-lg shadow-lg p-4 flex">
      <div className="w-full flex justify-center items-center flex-col gap-1">
        <div
          className="h-16 w-16 shadow-md rounded-full bg-top bg-cover bg-no-repeat relative"
          style={{ backgroundImage: `url('${agent.photo}')` }}>
          <FaCheck
            aria-hidden="true"
            className="text-sm absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 w-5 h-5 text-white"
          />
        </div>
        <p className="font-bold font-primary">{agent.name}</p>
      </div>
      <div className="min-w-[4rem] flex flex-col gap-1">
        <div className="flex flex-col gap-1">
          <div>
            <p className="font-bold text-lg font-primary leading-none break-words">
              {numberOfReviews}
            </p>
            <p className="font-secondary text-[0.55rem] -mt-1">Reviews</p>
          </div>
          <hr />
        </div>
        <div>
          <div>
            <div className="flex items-center gap-1">
              <p className="font-bold text-lg font-primary leading-none mt-2 break-words">
                {averageRating}
              </p>
              <FaStar className="text-xs" />
            </div>
            <p className="font-secondary text-[0.55rem] -mt-1">Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AgentContactDetail = ({ agent }: { agent: Agent }) => {
  return (
    <div className="flex gap-2 items-center text-gray-900 text-xs">
      <FaEnvelope />
      <p className="font-secondary font-light break-words ">
        Email me : {agent.email}
      </p>
    </div>
  );
};

const AgentListings = ({ agent, averageRating }: AgentProfileCardProps) => {
  const maxPropertiesToShow = 2;
  const numberOfProperties = agent.properties.length;

  return (
    <div>
      <h2 className="font-primary text-base">{agent.name}&apos;s listings</h2>
      <div className="flex gap-2 w-full">
        {agent.properties
          .slice(0, maxPropertiesToShow)
          .map((property, index) => (
            <div
              key={index}
              className={`${numberOfProperties > 1 ? "w-full" : "w-1/2"}`}>
              <div
                className="h-24 w-full shadow-md rounded-md bg-center bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url('${property.photos[0]}')`,
                }}
              />
              <div className="flex justify-between mt-2">
                <p className="font-primary font-bold text-xs leading-none mt-1">
                  {property.name}
                </p>
                <div className="flex gap-1">
                  <FaStar className="text-[0.5rem] mt-[2px]" />
                  <p className="font-light text-xs font-secondary leading-none  break-words">
                    {averageRating}
                  </p>
                </div>
              </div>
              <p className="font-secondary font-light text-xs leading-none text-gray-700">
                {property.location}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

const AgentModal = ({ agentId, setIsModal }: AgentModalProps) => {
  const [agent, setAgent] = useState<Agent | undefined>(undefined);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [numberOfReviews, setNumberOfReviews] = useState<number>(0);
  useEffect(() => {
    const fetchAgent = async () => {
      const data = await fetch(`${config.backendurl}/api/agent/${agentId}`);
      const res: AgentResponse = await data.json();

      const totalRatings: number[] = [];
      if (res.data.properties) {
        res.data.properties.forEach(property => {
          property.reviews.forEach(review => {
            totalRatings.push(review.rating);
          });
        });
      }

      setAverageRating(calculateAverageRating(totalRatings));
      setNumberOfReviews(totalRatings.length);

      setAgent(res.data);
    };
    fetchAgent();
  }, [agentId]);

  if (!agent) {
    return null;
  }

  return createPortal(
    <div
      aria-label="modal"
      className="fixed left-0 right-0 top-0 bottom-0 h-full w-full bg-black/40 flex justify-center items-center shadow-md">
      <div
        aria-label="modal-content"
        className="bg-brown-200 flex flex-col rounded-xl w-[16rem] h-3/4 p-4 gap-3">
        <button
          aria-label="close-modal"
          className="flex w-fit hover:bg-white/70 rounded-full p-1 transition-colors ease-in-out duration-200"
          onClick={() => setIsModal(false)}>
          <FaXmark aria-hidden="true" className="text-black text-sm" />
        </button>
        <AgentProfileCard
          agent={agent}
          numberOfReviews={numberOfReviews}
          averageRating={averageRating}
        />
        <AgentContactDetail agent={agent} />
        <AgentListings
          agent={agent}
          numberOfReviews={numberOfReviews}
          averageRating={averageRating}
        />
      </div>
    </div>,
    document.getElementById("modal") as HTMLElement,
  );
};

export default AgentModal;
