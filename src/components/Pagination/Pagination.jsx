import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../Button/Button";
import { getPaginationPages } from "../../services/pagination";
import "./Pagination.css";

const Pagination = ({ currentPage, links = {}, onPageChange }) => {
  const pageNumbers = getPaginationPages(links);
  const goToPage = (page) => () => onPageChange?.(page);

  return (
    <nav className="pagination" aria-label="Gallery pagination">
      <Button
        className="pagination__button pagination__button--icon"
        onClick={goToPage(links.prev)}
        disabled={!links.prev}
        aria-label="Previous page"
      >
        <ChevronLeft aria-hidden="true" />
      </Button>

      {pageNumbers.map((page) => (
        <Button
          key={page}
          className={`pagination__button ${currentPage === page ? "pagination__button--active" : ""}`}
          onClick={goToPage(page)}
          disabled={currentPage === page}
          aria-label={`Page ${page}`}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </Button>
      ))}

      {currentPage > 3 && (
        <Button
          className="pagination__button pagination__button--active"
          disabled
          aria-label={`Current page: ${currentPage}`}
          aria-current="page"
        >
          ...
        </Button>
      )}

      <Button
        className="pagination__button pagination__button--icon"
        onClick={goToPage(links.next)}
        disabled={!links.next}
        aria-label="Next page"
      >
        <ChevronRight aria-hidden="true" />
      </Button>
    </nav>
  );
};

export default Pagination;
