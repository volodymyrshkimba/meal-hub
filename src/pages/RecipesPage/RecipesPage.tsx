import RecipesList from "../../components/RecipesList/RecipesList.tsx";
import { useEffect } from "react";
import Container from "../../components/Container/Container.tsx";

import css from "./RecipesPage.module.css";
import { useDispatch } from "react-redux";
import {
  getAllCategories,
  getAllRecipesByCategoryList,
} from "../../redux/recipes/operations";
import { AppDispatch } from "../../redux/store.ts";

const CatalogPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllCategories()).then(() => {
      dispatch(getAllRecipesByCategoryList());
    });
  }, [dispatch]);

  return (
    <div className={css.recipesPage}>
      <Container>
        <RecipesList />
      </Container>
    </div>
  );
};

export default CatalogPage;
