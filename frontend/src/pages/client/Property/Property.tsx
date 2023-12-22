import React from "react";
import { useParams } from "react-router-dom";

const PropertyPage = () => {
  const { id } = useParams();
  return <div className="mt-10 bg-red-400">{id}</div>;
};

export default PropertyPage;
