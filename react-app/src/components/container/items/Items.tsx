import "./items.css";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store";
import {
  check,
  checkItem,
  fetchItems,
  filterItems,
  removeItem,
} from "../../../redux/listSlice";
import { useEffect } from "react";

const Items = () => {
  const { items, sorted } = useSelector((state: RootState) => state.list);
  const dispatch = useDispatch<AppDispatch>();
  const onCheck = (id: string, checked: boolean) => {
    dispatch(check(id));
    dispatch(checkItem({ id, checked: !checked }));
  };
  useEffect(() => {
    dispatch(fetchItems());
  }, []);
  useEffect(() => {
    dispatch(filterItems(""));
  }, [dispatch, items]);
  const onDelete = (id: string) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="items">
      {sorted.map((item) => (
        <div className="item-box" key={item._id}>
          <input
            onChange={() => onCheck(item._id, item.checked)}
            checked={item.checked!}
            className="item-checkbox"
            type="checkbox"
          />
          <h3
            style={{ textDecoration: item.checked ? "line-through" : "" }}
            onClick={() => onCheck(item._id, item.checked)}
            className="item-text"
          >
            {item.name}
          </h3>
          {item.checked && (
            <button
              onClick={() => onDelete(item._id)}
              className="delete-item-button"
            >
              X
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
export default Items;
