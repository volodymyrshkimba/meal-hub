import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "../../components/Container/Container";

import css from "./RecipeInfoPage.module.css";
import axios from "axios";
import { getIngredientsMeasure } from "../../utils/getIngredientsMeasure";
import { Recipe } from "../../types/recipeType";

const RecipeInfoPage = () => {
  const { id } = useParams();
  const [recipeInfo, setRecipeInfo] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchCarInfo = async () => {
      try {
        const { data } = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );

        setRecipeInfo(data.meals[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCarInfo();
  }, [id]);

  return (
    <>
      <Container>
        <div className={css.imageWrapper}>
          <img
            className={css.image}
            src={recipeInfo?.strMealThumb}
            alt={recipeInfo?.strMeal}
          />
        </div>
        <h1 className={css.title}>
          {recipeInfo?.strMeal} {recipeInfo?.strDrinkAlternate}{" "}
          {recipeInfo?.strCategory}
          <span className={css.id}>Id: {recipeInfo?.idMeal}</span>
        </h1>
        <p>Location: {recipeInfo?.strArea}</p>
        <p>Instructions: {recipeInfo?.strInstructions}</p>
        <p>Tags: {recipeInfo?.strTags}</p>
        <a
          className={css.link}
          href={recipeInfo?.strYoutube || "#"}
          target="_blank"
        >
          YouTube
        </a>
        <a
          className={css.link}
          href={recipeInfo?.strSource || "#"}
          target="_blank"
        >
          Source
        </a>
        <ul>
          Ingredients:
          {recipeInfo !== null &&
            getIngredientsMeasure(recipeInfo).map((item) => {
              return <li key={item}>{item}</li>;
            })}
        </ul>
      </Container>
    </>
  );
};

export default RecipeInfoPage;
