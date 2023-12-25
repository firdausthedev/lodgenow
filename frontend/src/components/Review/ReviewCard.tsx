import React from "react";
import { Review } from "./../../store/types";
import { FaStar } from "react-icons/fa6";

const ReviewCard = ({ review }: { review: Review }) => {
  const usernFirstChar = review.user.username.charAt(0);
  const cardBgColor = [
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-purple-500",
    "bg-pink-500",
  ];
  const randomColorIndex = Math.floor(Math.random() * cardBgColor.length);

  const StarRating = ({ numberOfStars }) => {
    const stars = Array.from({ length: numberOfStars }, (_, index) => (
      <FaStar key={index} className="text-xs" />
    ));

    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <div
          className={`h-14 w-14 rounded-full flex justify-center items-center uppercase font-secondary text-white ${cardBgColor[randomColorIndex]}`}>
          {usernFirstChar}
        </div>
        <div className="flex items-center">
          <p className="font-secondary">{review.user.username}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <StarRating numberOfStars={review.rating} />
        <p className="font-secondary">{review.comment}</p>
      </div>
    </div>
  );
};
export default ReviewCard;
