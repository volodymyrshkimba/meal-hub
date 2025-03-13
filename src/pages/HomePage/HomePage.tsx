import { Link } from "react-router-dom";

import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={css.homePage}>
      <h1 className={css.title}>Discover a World of Delicious Recipes!</h1>
      <p className={css.subtitle}>
        Find, choose, and combine your favorite dishes—all in one place.
      </p>
      <Link to="/recipes">View Recipes</Link>
    </div>
  );
};

export default HomePage;
