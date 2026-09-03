import { useEffect, useState } from "react";
import ImgCard from "../ImgCard/ImgCard";
import { getPhotos } from "../../services/unsplashApi";
import "./Gallery.css";

const Gallery = ({ columns = 3 }) => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadPhotos = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getPhotos({
          page: 1,
          perPage: 20,
          signal: controller.signal,
        });

        setPhotos(data);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message || "Could not load gallery images right now.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadPhotos();

    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading) {
    return <section className="gallery">Loading gallery...</section>;
  }

  if (error) {
    return <section className="gallery">{error}</section>;
  }

  return (
    <section className="gallery">
      <div className={`gallery__grid gallery__grid--${columns}`}>
        {photos.map((photo) => (
          <ImgCard key={photo.id} photo={photo} />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
