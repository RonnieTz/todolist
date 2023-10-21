import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import axios from "axios";

export const fetchItems = createAsyncThunk("/list/fethItems", async () => {
  const res = await axios.get("/api/get-items");
  return res.data;
});

export const postItem = createAsyncThunk(
  "list/postItem",
  async (name: string) => {
    const res = await axios.post("/api/save-item", {
      name,
    });
    return res.data;
  }
);

export const removeItem = createAsyncThunk(
  "list/deleteItem",
  async (id: string) => {
    const res = await axios.delete(`/api/delete-item?id=${id}`);
    return res.data;
  }
);

export const checkItem = createAsyncThunk(
  "list/checkItem",
  async ({ id, checked }: { id: string; checked: boolean }) => {
    const res = await axios.patch(
      `/api/check-item?id=${id}&checked=${checked}`
    );
    console.log(res.data);
  }
);

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    check: (state, action) => {
      const index = state.items.findIndex(
        (item) => item._id === action.payload
      );
      state.items[index].checked = !state.items[index].checked;
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    changeInput: (state, action) => {
      state.input = action.payload;
    },
    saveItem: (state, action) => {
      state.items.push({
        _id: String(Math.random()),
        checked: false,
        name: action.payload,
      });
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    filterItems: (state, action) => {
      const items = [...state.items];
      const filter = action.payload;
      if (!action.payload) {
        state.sorted = state.items;
      }
      state.sorted = items.sort((a, b) => {
        if (
          a.name.toLowerCase().includes(filter) &&
          !b.name.toLowerCase().includes(filter)
        ) {
          return -1;
        } else if (
          !a.name.toLowerCase().includes(filter) &&
          b.name.toLowerCase().includes(filter)
        ) {
          return 1;
        } else {
          return 0;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(postItem.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(removeItem.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const {
  check,
  deleteItem,
  changeInput,
  saveItem,
  setFilter,
  filterItems,
} = listSlice.actions;
export default listSlice.reducer;
