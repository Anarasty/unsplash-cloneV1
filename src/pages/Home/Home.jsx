import { useState } from "react";
import { Dice3, Dice5 } from "lucide-react";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Gallery from "../../components/Gallery/Gallery";
import "./Home.css";

const Home = () => {
  const [galleryColumns, setGalleryColumns] = useState(3);

  return (
    <div>
      <Header />
      <main className="home">
        <section className="home__gallery-toolbar">
          <div className="home__gallery-toolbar-left">
            <div className="home__view-buttons" role="group" aria-label="Gallery view mode">
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
        </section>

        <Gallery columns={galleryColumns} />
      </main>
    </div>
  );
};

export default Home;
