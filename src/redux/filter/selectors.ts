import { RootState } from "../store";

export const selectCategory = (state: RootState) => state.filters.category;
export const selectBasket = (state: RootState) => state.filters.basket;
