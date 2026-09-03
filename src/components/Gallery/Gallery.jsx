import { useEffect, useState } from "react";
import ImgCard from "../ImgCard/ImgCard";
import { getPhotos } from "../../services/unsplashApi";
import "./Gallery.css";

const Gallery = ({ columns = 3, page = 1, onPaginationChange }) => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrentRequest = true;

    const loadPhotos = async () => {
      try {
        setIsLoading(true);
        setError("");

        const { photos: galleryPhotos, pagination } = await getPhotos({
          page,
          perPage: 30,
        });

        if (isCurrentRequest) {
          setPhotos(galleryPhotos);
          onPaginationChange?.(pagination);
        }
      } catch (fetchError) {
        if (isCurrentRequest) {
          setError(fetchError.message || "Could not load gallery images right now.");
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
  }, [onPaginationChange, page]);

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
