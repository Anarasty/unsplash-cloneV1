import { useEffect, useState } from "react";
import ImgCard from "../ImgCard/ImgCard";
import { getPhotos } from "../../services/unsplashApi";
import { searchPhotos } from "../../services/search";
import Loader from "../Loader/Loader";
import "./Gallery.css";

const Gallery = ({ columns = 3, page = 1, query = "", onPaginationChange }) => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrentRequest = true;

    const loadPhotos = async () => {
      try {
        setIsLoading(true);
        setError("");

        const loadGallery = query ? searchPhotos : getPhotos;
        const {
          photos: galleryPhotos,
          pagination,
          page: resolvedPage = page,
        } = await loadGallery({
          query,
          page,
          perPage: query ? 10 : 30,
        });

        if (isCurrentRequest) {
          setPhotos(galleryPhotos);
          onPaginationChange?.({ ...pagination, current: resolvedPage });
        }
      } catch (fetchError) {
        if (isCurrentRequest) {
          setError(
            fetchError.message || "Could not load gallery images right now.",
          );
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    };

    loadPhotos();

    return () => {
      isCurrentRequest = false;
    };
  }, [onPaginationChange, page, query]);

  if (isLoading) {
    return (
      <section className="gallery gallery--loading">
        <Loader label="Loading gallery" />
      </section>
    );
  }

  if (error) {
    return <section className="gallery">{error}</section>;
  }

  if (query && photos.length === 0) {
    return (
      <section className="gallery">No photos found for “{query}”.</section>
    );
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
