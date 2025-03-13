import { useSelector } from "react-redux";
import Container from "../../components/Container/Container";
import { selectRecipesInBasket } from "../../redux/recipes/selectors";

import css from "./RecipesBasketPage.module.css";
import { getIngredientsMeasure } from "../../utils/getIngredientsMeasure";
import { Recipe } from "../../types/recipeType";

export default function RecipesBasketPage() {
  const recipesInBasket = useSelector(selectRecipesInBasket);
  const summary = recipesInBasket.flatMap((recipe: Recipe) => {
    return getIngredientsMeasure(recipe);
  });

  return (
    <Container>
      <div className={css.contentWrapper}>
        <ul className={css.list}>
          {recipesInBasket.map((item: Recipe) => {
            return (
              <li key={item.idMeal} className={css.item}>
                <div className={css.imgWrapper}>
                  <img
                    className={css.image}
                    src={item.strMealThumb || ""}
                    alt={item.strMeal || "meal"}
                  />
                </div>
                <div>
                  <div className={css.mainInfo}>
                    <p>{item.strMeal || "meal"}</p>
                    <p>{item.strCategory || "category"}</p>
                    <p>{item.strArea || "area"}</p>
                    <p>{item.strInstructions || "instructions"}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div>
          <span>Summary:</span>
          <ul>
            {summary.map((item: string, index: number) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </div>
      </div>
    </Container>
  );
}
