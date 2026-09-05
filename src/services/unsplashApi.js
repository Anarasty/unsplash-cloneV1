import { getPaginationLinks } from "./pagination";

const UNSPLASH_BASE_URL = "https://api.unsplash.com";
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const pendingPhotoRequests = new Map();

export const getPhotos = ({ page = 1, perPage = 20 } = {}) => {
  if (!UNSPLASH_ACCESS_KEY) {
    throw new Error("Missing VITE_UNSPLASH_ACCESS_KEY in .env");
  }

  const endpoint = `${UNSPLASH_BASE_URL}/photos?page=${page}&per_page=${perPage}`;
  const pendingRequest = pendingPhotoRequests.get(endpoint);

  if (pendingRequest) {
    return pendingRequest;
  }

  const request = fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    },
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error(`Unsplash request failed: ${response.status}`);
    }

    const data = await response.json();
    const photos = Array.isArray(data) ? data : [];

    return {
      photos: photos
        .map((photo) => ({
          id: photo.id,
          photo_url: photo.urls?.regular || photo.urls?.small || "",
          width: photo.width,
          height: photo.height,
          caption:
            photo.alt_description ||
            photo.description ||
            `Photo by ${photo.user?.name || "Unknown author"}`,
          created_at: photo.created_at,
          updated_at: photo.updated_at,
        }))
        .filter((photo) => Boolean(photo.photo_url)),
      pagination: getPaginationLinks(response.headers.get("Link")),
    };
  });

  pendingPhotoRequests.set(endpoint, request);
  request.then(
    () => pendingPhotoRequests.delete(endpoint),
    () => pendingPhotoRequests.delete(endpoint),
  );

  return request;
};

export const getPhoto = (photoId) => {
  if (!photoId) {
    throw new Error("A photo ID is required.");
  }

  if (!UNSPLASH_ACCESS_KEY) {
    throw new Error("Missing VITE_UNSPLASH_ACCESS_KEY in .env");
  }

  const endpoint = `${UNSPLASH_BASE_URL}/photos/${encodeURIComponent(photoId)}`;
  const pendingRequest = pendingPhotoRequests.get(endpoint);

  if (pendingRequest) {
    return pendingRequest;
  }

  const request = fetch(endpoint, {
    headers: {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    },
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? "Photo not found."
          : `Unsplash request failed: ${response.status}`,
      );
    }

    const photo = await response.json();
    const instagramUsername =
      photo.user?.social?.instagram_username || photo.user?.instagram_username;
    const twitterUsername =
      photo.user?.social?.twitter_username || photo.user?.twitter_username;
    const social = instagramUsername
      ? {
          platform: "Instagram",
          username: instagramUsername,
          url: `https://www.instagram.com/${encodeURIComponent(instagramUsername)}`,
        }
      : twitterUsername
        ? {
            platform: "X",
            username: twitterUsername,
            url: `https://x.com/${encodeURIComponent(twitterUsername)}`,
          }
        : null;

    return {
      id: photo.id,
      photo_url: photo.urls?.regular || photo.urls?.full || photo.urls?.small || "",
      title: photo.alt_description || photo.description || "Untitled photo",
      description:
        photo.description ||
        photo.short_description ||
        photo.alt_description ||
        "No description available.",
      downloads: photo.downloads ?? 0,
      likes: photo.likes ?? 0,
      views: photo.views ?? 0,
      author: {
        name: photo.user?.name || "Unknown author",
        username: photo.user?.username || "",
        social,
      },
      width: photo.width,
      height: photo.height,
    };
  });

  pendingPhotoRequests.set(endpoint, request);
  request.then(
    () => pendingPhotoRequests.delete(endpoint),
    () => pendingPhotoRequests.delete(endpoint),
  );

  return request;
};
