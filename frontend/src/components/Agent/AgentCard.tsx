import React from "react";
import { useEffect, useState } from "react";

import config from "../config";
import { Agent } from "./../../store/types";

interface AgentResponse {
  success: boolean;
  data: Agent;
}

const sampleData: Agent = {
  id: "6b23fb9c-22a2-461b-af72-c72a7a67b21d",
  name: "Peter Doe",
  email: "peterdoe@example.com",
  photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
  properties: [],
};

const calculateAverageRating = (ratings: number[]): number => {
  if (ratings.length === 0) {
    return 0;
  }

  const sumOfRatings = ratings.reduce((total, rating) => total + rating, 0);
  const numberOfReviews = ratings.length;

  return sumOfRatings / numberOfReviews;
};

const AgentCard = () => {
  const [agent, setAgent] = useState<Agent | undefined>(sampleData);

  useEffect(() => {
    const fetchAgent = async () => {
      const data = await fetch(
        `${config.backendurl}/api/agent/adf2939b-8283-4694-9621-93b141f07a23`,
      );
      const res: AgentResponse = await data.json();

      const totalRatings: number[] = [];
      if (res.data.properties) {
        res.data.properties.forEach(property => {
          property.reviews.forEach(review => {
            totalRatings.push(review.rating);
          });
        });
      }

      console.log(res.data.properties);
      console.log(totalRatings);
      console.log(calculateAverageRating(totalRatings));

      setAgent(res.data);
    };
    fetchAgent();
  }, []);

  if (!agent) return null;

  return (
    <div
      className="h-[5.25rem] w-16 bg-gray-400 shadow-md 
                 rounded-tr-lg rounded-br-lg rounded-tl-sm rounded-bl-sm
                 flex justify-center items-center cursor-pointer
                 group overflow-hidden  
                 relative">
      <div
        className={`h-10 w-10 shadow-md rounded-full bg-center bg-cover bg-no-repeat
                    transition-transform transform  group-hover:scale-110`}
        style={{ backgroundImage: `url('${agent.photo}')` }}
      />
      <div className="h-full w-[1px] bg-gray-500/20 absolute left-1"></div>
    </div>
  );
};

export default AgentCard;
