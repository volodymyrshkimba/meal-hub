import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

export const getAllCategories = createAsyncThunk(
  "cars/getAllCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${API_URL}categories.php`);
      return data.categories;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const getAllRecipesByCategoryList = createAsyncThunk(
  "cars/getAllRecipesByCategoryList",
  async (_, thunkAPI) => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

    try {
      const categoryRequests = alphabet.map(async (letter) => {
        const { data } = await axios.get(`${API_URL}search.php?f=${letter}`);
        return data.meals;
      });

      const results = await Promise.all(categoryRequests);

      const allRecipes = results.flat();

      return allRecipes;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);
