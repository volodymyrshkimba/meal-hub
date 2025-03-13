import { NavLink } from "react-router-dom";

import Container from "../Container/Container";

import css from "./Header.module.css";

const Header = () => {
  return (
    <header className={css.pageHeader}>
      <Container>
        <div className={css.wrapper}>
          <nav>
            <ul className={css.linkList}>
              <li className={css.link}>
                <NavLink to="/">Home</NavLink>
              </li>
              <li className={css.link}>
                <NavLink to="/recipes">Recipes</NavLink>
              </li>
              <li className={css.link}>
                <NavLink to="/recipesbasket">Basket</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
