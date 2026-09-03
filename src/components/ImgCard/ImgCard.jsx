import "./ImgCard.css";

const ImgCard = ({ photo }) => {
  const imageUrl = photo?.photo_url;
  const caption = photo?.caption || "Unsplash clone image";

  return (
    <article className="img-card">
      <img className="img-card__image" src={imageUrl} alt={caption} loading="lazy" />
      <p className="img-card__caption">{caption}</p>
    </article>
  );
};

export default ImgCard;
