import { useEffect, useState } from "react";
import ImgCard from "../ImgCard/ImgCard";
import "./Gallery.css";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadPhotos = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch("https://jsonfakery.com/photos", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load photos");
        }

        const data = await response.json();
        setPhotos(Array.isArray(data) ? data.slice(0, 20) : []);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError("Could not load gallery images right now.");
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
      <div className="gallery__grid">
        {photos.map((photo) => (
          <ImgCard key={photo.id} photo={photo} />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
