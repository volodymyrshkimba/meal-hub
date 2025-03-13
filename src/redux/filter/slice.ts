import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface filtersState {
  basket: string[];
  category: string;
}

const initialState: filtersState = {
  category: "",
  basket: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.category = action.payload;
    },
    addToBasket: (state, action: PayloadAction<string>) => {
      state.basket.push(action.payload);
    },
    deleteFromBasket: (state, action) => {
      state.basket = state.basket.filter((item) => item !== action.payload);
    },
  },
});

export const { changeFilter, addToBasket, deleteFromBasket } =
  filtersSlice.actions;

export default filtersSlice.reducer;
