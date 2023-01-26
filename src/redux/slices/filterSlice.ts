import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface ISortType {
  name: string;
  sortProperty: string;
}

interface IInitialState {
  categoryType: number;
  sortType: ISortType;
  currentPage: number;
}

const initialState: IInitialState = {
  categoryType: 0,
  sortType: {
    name: "популярности",
    sortProperty: "rating",
  },
  currentPage: 1,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryType(state, action: PayloadAction<number>) {
      state.categoryType = action.payload;
    },
    setSortType(state, action: PayloadAction<ISortType>) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryType, setSortType, setCurrentPage } =
  filterSlice.actions;

export const selectSortType = (state: RootState) => state.filterSlice.sortType;
export const selectCategoryType = (state: RootState) =>
  state.filterSlice.categoryType;
export const selectCurrentPage = (state: RootState) =>
  state.filterSlice.currentPage;

export default filterSlice.reducer;
