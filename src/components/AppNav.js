import { NavLink } from "react-router-dom";
import style from "./AppNav.module.css";

function AppNav() {
  return (
    <nav className={style.nav}>
      <ul>
        <li className="logo">
          <NavLink to="/">FOOD APP 🍗</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/cart">Cart</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
