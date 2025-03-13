import { createSlice } from "@reduxjs/toolkit";
import { getAllCategories, getAllRecipesByCategoryList } from "./operations";
import { Category } from "../../types/categoryType";
import { Recipe } from "../../types/recipeType";

interface recipesState {
  categories: Category[];
  allRecipes: Recipe[];
}

const initialState: recipesState = {
  categories: [],
  allRecipes: [],
};

const slice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getAllRecipesByCategoryList.fulfilled, (state, action) => {
        state.allRecipes = action.payload;
      });
  },
});

export default slice.reducer;
