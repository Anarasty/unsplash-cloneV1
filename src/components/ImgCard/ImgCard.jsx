import { useState } from "react";
import Loader from "../Loader/Loader";
import "./ImgCard.css";

const ImgCard = ({ photo }) => {
  const imageUrl = photo?.photo_url;
  const caption = photo?.caption || "Unsplash clone image";
  const width = Number(photo?.width) || 4;
  const height = Number(photo?.height) || 3;
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageLoaded = () => {
    setIsImageLoading(false);
  };

  return (
    <article className="img-card">
      <div className="img-card__media" style={{ aspectRatio: `${width} / ${height}` }}>
        {isImageLoading && <Loader className="img-card__loader" />}

        <img
          className={`img-card__image ${isImageLoading ? "img-card__image--hidden" : ""}`}
          src={imageUrl}
          alt={caption}
          loading="lazy"
          onLoad={handleImageLoaded}
          onError={handleImageLoaded}
        />
      </div>
    </article>
  );
};

export default ImgCard;
