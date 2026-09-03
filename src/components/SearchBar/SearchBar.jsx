import { Search, Image } from "lucide-react";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <form className="search-bar__form" role="search">
        <button type="submit" className="search-bar__button" aria-label="Search">
          <Search className="search-bar__icon" />
        </button>

        <input
          type="text"
          className="search-bar__input"
          placeholder="Search photos and illustrations"
          aria-label="Search photos and illustrations"
        />

        <button
          type="button"
          className="search-bar__button search-bar__action"
          aria-label="Search by image"
        >
          <Image className="search-bar__icon" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
