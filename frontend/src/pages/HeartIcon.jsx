import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addTofavorite,
  removeFromfavorite,
} from "../redux/slices/favoriteSlice";

const HeartIcon = ({ course }) => {
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
      className="absolute top-2 right-5 cursor-pointer text-xl"
      onClick={toggleFavorites}
    >
      {isFavorite ? (
        <FaHeart className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-white" />
      )}
    </div>
  );
};

export default HeartIcon;
