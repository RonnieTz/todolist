import "./input.css";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { changeInput, postItem } from "../../../redux/listSlice";

const Input = () => {
  const { input } = useSelector((state: RootState) => state.list);
  const dispatch = useDispatch<AppDispatch>();
  const onSave = () => {
    if (input) {
      dispatch(postItem(input));
      dispatch(changeInput(""));
    }
  };
  return (
    <div className="input-container">
      <input
        onChange={(e) => dispatch(changeInput(e.target.value))}
        value={input}
        className="input"
        placeholder="New item..."
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSave();
          }
        }}
      />
      <button onClick={onSave} className="button">
        Save
      </button>
    </div>
  );
};
export default Input;
