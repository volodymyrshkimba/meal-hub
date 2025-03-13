import { Recipe } from "../types/recipeType";

export const getIngredientsMeasure = (recipe: Recipe): string[] => {
  const summ = [];

  for (let index = 1; index <= 20; index++) {
    const ingredient = recipe[`strIngredient${index}` as keyof Recipe];
    const measure = recipe[`strMeasure${index}` as keyof Recipe];

    if (ingredient && ingredient.trim() !== "") {
      summ.push(`${ingredient} : ${measure || "to taste"}`);
    }
  }

  return summ;
};
