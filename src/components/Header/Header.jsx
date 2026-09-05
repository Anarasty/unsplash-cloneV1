import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import Button from "../Button/Button";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";

const Header = ({ initialQuery = "", onSearch }) => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        Unsplash Clone
      </Link>

      <div className="header__search">
        <SearchBar
          key={initialQuery}
          initialQuery={initialQuery}
          onSearch={onSearch}
        />
      </div>

      <div className="header__actions">
        <span className="header__user">{user.name}</span>
        <Button onClick={logout}>Logout</Button>
      </div>
    </header>
  );
};

export default Header;
