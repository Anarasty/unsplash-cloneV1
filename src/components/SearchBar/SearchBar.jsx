import { useState } from "react";
import { Search, X } from "lucide-react";
import "./SearchBar.css";

const SearchBar = ({ initialQuery = "", onSearch }) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch?.(query.trim());
  };

  return (
    <div className="search-bar">
      <form className="search-bar__form" role="search" onSubmit={handleSubmit}>
        <button
          type="submit"
          className="search-bar__button"
          aria-label="Search"
        >
          <Search className="search-bar__icon" />
        </button>

        <input
          type="text"
          className="search-bar__input"
          placeholder="Search photos and illustrations"
          aria-label="Search photos and illustrations"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <button
          type="button"
          className="search-bar__button search-bar__action"
          aria-label="Clear search"
          onClick={() => setQuery("")}
          disabled={!query}
        >
          <X className="search-bar__icon" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
