import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";


type TProps = {
    rate: number;
  };

const Rating = ({ rate = 0 }: TProps) => {
  const fullStars = Math.floor(rate);
  const halfStar = rate % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center text-yellow-500 text-lg">
        {[...Array(fullStars)].map((_, i) => (
            <FaStar key={`full-${i}`} />
        ))}
        {halfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
            <FaRegStar key={`empty-${i}`} />
        ))}
    </div>
  );
};

export default Rating;
