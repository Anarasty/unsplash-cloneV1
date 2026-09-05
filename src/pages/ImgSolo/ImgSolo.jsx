import { useEffect, useState } from "react";
import { Download, Eye, Heart } from "lucide-react";
import { Link, useParams } from "react-router";
import Badge from "../../components/Badge/Badge";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";
import { getPhoto } from "../../services/unsplashApi";
import "./ImgSolo.css";

const formatCount = (count) => Number(count || 0).toLocaleString();

const ImgSolo = () => {
  const { photoId } = useParams();
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrentRequest = true;

    const loadPhoto = async () => {
      try {
        setIsLoading(true);
        setIsImageLoading(true);
        setError("");
        const selectedPhoto = await getPhoto(photoId);

        if (isCurrentRequest) {
          setPhoto(selectedPhoto);
        }
      } catch (fetchError) {
        if (isCurrentRequest) {
          setError(fetchError.message || "Could not load this photo.");
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    };

    loadPhoto();

    return () => {
      isCurrentRequest = false;
    };
  }, [photoId]);

  return (
    <div>
      <Header />
      <main className="img-solo">
        {isLoading && (
          <div className="img-solo__status">
            <Loader label="Loading photo" />
          </div>
        )}

        {!isLoading && error && (
          <div className="img-solo__status img-solo__status--error">
            <p>{error}</p>
            <Link to="/" className="img-solo__back-link">
              Back to gallery
            </Link>
          </div>
        )}

        {!isLoading && photo && (
          <article className="img-solo__layout">
            <div className="img-solo__media">
              {isImageLoading && (
                <Loader className="img-solo__image-loader" label="Loading image" />
              )}
              <img
                className={`img-solo__image ${isImageLoading ? "img-solo__image--hidden" : ""}`}
                src={photo.photo_url}
                alt={photo.title}
                onLoad={() => setIsImageLoading(false)}
                onError={() => setIsImageLoading(false)}
              />
            </div>

            <aside className="img-solo__details">
              <h1 className="img-solo__title">{photo.title}</h1>

              <div className="img-solo__badges" aria-label="Photo statistics">
                <Badge
                  icon={Download}
                  label="Downloads"
                  value={formatCount(photo.downloads)}
                  showLabel={false}
                  aria-label={`Downloads: ${formatCount(photo.downloads)}`}
                />
                <Badge
                  icon={Heart}
                  label="Likes"
                  value={formatCount(photo.likes)}
                  showLabel={false}
                  aria-label={`Likes: ${formatCount(photo.likes)}`}
                />
                <Badge
                  icon={Eye}
                  label="Views"
                  value={formatCount(photo.views)}
                  showLabel={false}
                  aria-label={`Views: ${formatCount(photo.views)}`}
                />
              </div>

              <p className="img-solo__description">{photo.description}</p>

              {photo.tags.length > 0 && (
                <nav className="img-solo__tags" aria-label="Photo tags">
                  {photo.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/tags/${encodeURIComponent(tag)}`}
                      className="img-solo__tag"
                    >
                      #{tag}
                    </Link>
                  ))}
                </nav>
              )}

              <section className="img-solo__author" aria-labelledby="photo-author">
                <p className="img-solo__eyebrow">Photographer</p>
                <h2 id="photo-author" className="img-solo__author-name">
                  {photo.author.name}
                </h2>
                {photo.author.username && (
                  <p className="img-solo__username">@{photo.author.username}</p>
                )}
                {photo.author.social && (
                  <a
                    className="img-solo__social-link"
                    href={photo.author.social.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {photo.author.social.platform}: @{photo.author.social.username}
                  </a>
                )}
              </section>
            </aside>
          </article>
        )}
      </main>
    </div>
  );
};

export default ImgSolo;
