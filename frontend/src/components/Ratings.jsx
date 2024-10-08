import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value, text }) => {
  const fullStars = Math.floor(value);
  const halfStars = value - fullStars > 0.5 ? 1 : 0;
  const emptyStar = 5 - fullStars - halfStars;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} className="text-yellow-300 ml-1" />
      ))}

      {halfStars === 1 && <FaStarHalfAlt className="text-yellow-300 ml-1" />}
      {[...Array(emptyStar)].map((_, index) => (
        <FaRegStar key={index} className="text-yellow-300 ml-1" />
      ))}

      {text && <span className="ml-1">({text})</span>}
    </div>
  );
};

Ratings.defaultProps = {
  color: "",
};

export default Ratings;
