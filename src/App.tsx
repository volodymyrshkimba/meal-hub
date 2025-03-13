import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/HomePage/HomePage.tsx";
import RecipesPage from "./pages/RecipesPage/RecipesPage.tsx";
import RecipeInfoPage from "./pages/RecipeInfoPage/RecipeInfoPage.tsx";
import Header from "./components/Header/Header.tsx";
import RecipesBasketPage from "./pages/RecipesBasketPage/RecipesBasketPage.tsx";

function App() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/recipes/:id" element={<RecipeInfoPage />} />
            <Route path="/recipesbasket" element={<RecipesBasketPage />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
