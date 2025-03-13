import { createSelector } from "@reduxjs/toolkit";
import { selectBasket, selectCategory } from "../filter/selectors";
import { RootState } from "../store";
import { Recipe } from "../../types/recipeType";

export const selectAllRecipes = (state: RootState) => state.recipes.allRecipes;
export const selectAllCategories = (state: RootState) =>
  state.recipes.categories;

export const selectRecipesByCategory = createSelector(
  [selectAllRecipes, selectCategory],
  (recipes: Recipe[], category: string) => {
    return recipes.filter((item) => {
      if (category === "") return item;
      return item?.strCategory === category;
    });
  }
);

export const selectRecipesInBasket = createSelector(
  [selectAllRecipes, selectBasket],
  (recipes: Recipe[], basket: string[]) => {
    return recipes.filter((item) => {
      return basket.includes(item?.idMeal);
    });
  }
);
