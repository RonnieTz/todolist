import "./container.css";
import Input from "./input/Input";
import Items from "./items/Items";
import { Search } from "./search/Search";

const Container = () => {
  return (
    <div className="container">
      <Input />
      <Search />
      <Items />
    </div>
  );
};
export default Container;
