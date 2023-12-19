import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface SearchState {
  searchTerm: string;
}

const initialState: SearchState = {
  searchTerm: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearSearchTerm: state => {
      state.searchTerm = "";
    },
  },
});

export const { setSearchTerm, clearSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;

export const selectSearchTerm = (state: RootState) => state.search.searchTerm;
