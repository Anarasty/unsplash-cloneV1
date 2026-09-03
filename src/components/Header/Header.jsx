import { Link } from "react-router";
import Button from "../Button/Button";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        Unsplash Clone
      </Link>

      <div className="header__search">
        <SearchBar />
      </div>

      <div className="header__actions">
        <Button>Login</Button>
      </div>
    </header>
  );
};

export default Header;
