import { useCallback, useState } from "react";
import { Dice3, Dice5 } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Gallery from "../../components/Gallery/Gallery";
import Pagination from "../../components/Pagination/Pagination";
import "./Home.css";

const Home = () => {
  const { tag = "" } = useParams();
  const navigate = useNavigate();
  const [galleryColumns, setGalleryColumns] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationLinks, setPaginationLinks] = useState({});
  const searchQuery = tag;
  const handlePaginationChange = useCallback((links) => {
    if (Number.isInteger(links.current) && links.current > 0) {
      setCurrentPage(links.current);
    }

    setPaginationLinks((currentLinks) => ({
      ...links,
      first: links.first ?? currentLinks.first ?? 1,
      last: links.last ?? currentLinks.last,
    }));
  }, []);
  const handleSearch = useCallback(
    (query) => {
      setCurrentPage(1);
      setPaginationLinks({});
      navigate(query ? `/tags/${encodeURIComponent(query)}` : "/");
    },
    [navigate],
  );

  return (
    <div>
      <Header initialQuery={searchQuery} onSearch={handleSearch} />
      <main className="home">
        <section className="home__gallery-toolbar">
          <div className="home__gallery-toolbar-left">
            <div
              className="home__view-buttons"
              role="group"
              aria-label="Gallery view mode"
            >
              <Button
                className={`home__view-button ${galleryColumns === 3 ? "home__view-button--active" : ""}`}
                onClick={() => setGalleryColumns(3)}
                aria-label="3 column gallery"
              >
                <Dice3 className="home__view-icon" />
              </Button>

              <Button
                className={`home__view-button ${galleryColumns === 5 ? "home__view-button--active" : ""}`}
                onClick={() => setGalleryColumns(5)}
                aria-label="5 column gallery"
              >
                <Dice5 className="home__view-icon" />
              </Button>
            </div>
          </div>

          <Pagination
            currentPage={currentPage}
            links={paginationLinks}
            onPageChange={setCurrentPage}
          />
        </section>

        <Gallery
          columns={galleryColumns}
          page={currentPage}
          query={searchQuery}
          onPaginationChange={handlePaginationChange}
        />
      </main>
    </div>
  );
};

export default Home;
