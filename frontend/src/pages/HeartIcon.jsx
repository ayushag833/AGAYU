import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addTofavorite,
  removeFromfavorite,
} from "../redux/slices/favoriteSlice";

const HeartIcon = ({ course, css, condition }) => {
  const dispatch = useDispatch();
  const { favoriteItems } = useSelector((state) => state.favorite);
  const isFavorite = favoriteItems.some((item) => item?._id === course?._id);

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromfavorite(course?._id));
    } else {
      dispatch(addTofavorite(course));
    }
  };

  return (
    <div
      className={`absolute top-3 right-6 cursor-pointer ${
        condition && "right-8"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorites();
      }}
    >
      {isFavorite ? (
        <FaHeart
          className={`text-pink-500 ${
            css ? "relative right-[-0.8rem] top-[-0.1rem] text-2xl" : "text-3xl"
          }`}
        />
      ) : (
        <FaRegHeart
          className={`text-white ${
            css ? "relative right-[-0.8rem] top-[-0.1rem] text-2xl" : "text-3xl"
          }`}
        />
      )}
    </div>
  );
};

export default HeartIcon;
