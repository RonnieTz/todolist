export const initialState: {
  items: { _id: string; checked: boolean; name: string }[];
  input: string;
  search: string;
  filter: string;
  sorted: { _id: string; checked: boolean; name: string }[];
} = {
  items: [],
  input: "",
  search: "",
  filter: "",
  sorted: [],
};
