import React, { useState } from "react";
import AgentModal from "./AgentModal";

interface AgentCardProps {
  agentId: string;
  photo: string;
}

const AgentCard = ({ agentId, photo }: AgentCardProps) => {
  const [isModal, setIsModal] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsModal(!isModal)}
        className="h-20 w-16 bg-brown-200 shadow-md 
                 rounded-tr-lg rounded-br-lg rounded-tl-sm rounded-bl-sm
                 flex justify-center items-center cursor-pointer
                 group overflow-hidden  
                 relative">
        <div
          className="h-10 w-10 shadow-md rounded-full bg-top bg-cover bg-no-repeat
                    transition-transform transform group-hover:scale-110"
          style={{ backgroundImage: `url('${photo}')` }}
        />
        <div className="h-full w-[1px] bg-gray-500/20 absolute left-1"></div>
      </button>
      {isModal && <AgentModal agentId={agentId} setIsModal={setIsModal} />}
    </>
  );
};

export default AgentCard;
