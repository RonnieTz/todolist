import "./search.css";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store";
import { setFilter, filterItems } from "../../../redux/listSlice";

export const Search = () => {
  const { filter } = useSelector((state: RootState) => state.list);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="search-container">
      <input
        onChange={(e) => {
          dispatch(filterItems(e.target.value.toLowerCase()));
          dispatch(setFilter(e.target.value.toLowerCase()));
        }}
        value={filter}
        placeholder="Search..."
        className="search"
        type="text"
      />
    </div>
  );
};
