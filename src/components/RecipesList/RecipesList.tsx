import { useDispatch, useSelector } from "react-redux";

import {
  selectAllCategories,
  selectRecipesByCategory,
} from "../../redux/recipes/selectors";

import css from "./RecipesList.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  addToBasket,
  changeFilter,
  deleteFromBasket,
} from "../../redux/filter/slice";
import { selectBasket } from "../../redux/filter/selectors";
import { Recipe } from "../../types/recipeType";
import { Category } from "../../types/categoryType";

const RecipesList = () => {
  const dispatch = useDispatch();
  const allCategories = useSelector(selectAllCategories);
  const recipesByCategory = useSelector(selectRecipesByCategory);
  const basket = useSelector(selectBasket);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(recipesByCategory.length / itemsPerPage);
  const currentItems = recipesByCategory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPagination = () => {
    let pages = [];

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages = [1, 2, 3, 4, 5, 6, 7, "...", totalPages];

      if (currentPage >= 7 && currentPage < totalPages - 3) {
        pages = [
          1,
          "..",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }

      if (currentPage >= totalPages - 3) {
        pages = [
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      }
    }

    return pages;
  };

  return (
    <>
      <ul className={css.categories}>
        {allCategories.map((item: Category) => {
          return (
            <li
              onClick={() => {
                dispatch(changeFilter(item.strCategory));
              }}
              className={css.category}
              key={item.idCategory}
            >
              {item.strCategory}
            </li>
          );
        })}
      </ul>
      <ul className={css.list}>
        {currentItems.map((item: Recipe) => {
          if (item) {
            return (
              <li key={item.idMeal} className={css.item}>
                <button
                  type="button"
                  onClick={() => {
                    const inBasket = basket.find(
                      (inBasketId: string) => inBasketId === item.idMeal
                    );

                    if (!inBasket) {
                      dispatch(addToBasket(item.idMeal));
                      return;
                    }

                    dispatch(deleteFromBasket(item.idMeal));
                  }}
                >
                  {"add to basket"}
                </button>
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
                  </div>
                </div>
                <Link className={css.link} to={`/recipes/${item.idMeal}`}>
                  Read more
                </Link>
              </li>
            );
          }
        })}
      </ul>
      <ul className={css.paginationList}>
        <li
          onClick={() => {
            if (currentPage === 1) return;
            setCurrentPage(currentPage - 1);
          }}
        >
          prev page
        </li>
        {getPagination().map((item) => {
          return (
            <li
              onClick={() => {
                if (Number.isNaN(Number(item))) return;

                setCurrentPage(
                  typeof item === "string" ? parseInt(item) : item
                );
              }}
              className={css.page}
              key={item}
            >
              {item}
            </li>
          );
        })}
        <li
          onClick={() => {
            if (currentPage > totalPages) return;
            setCurrentPage(currentPage + 1);
          }}
        >
          next page
        </li>
      </ul>
    </>
  );
};

export default RecipesList;
