const UNSPLASH_BASE_URL = "https://api.unsplash.com";
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const getPhotos = async ({ page = 1, perPage = 20, signal } = {}) => {
  if (!UNSPLASH_ACCESS_KEY) {
    throw new Error("Missing VITE_UNSPLASH_ACCESS_KEY in .env");
  }

  const endpoint = `${UNSPLASH_BASE_URL}/photos?page=${page}&per_page=${perPage}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Unsplash request failed: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return data
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
    .filter((photo) => Boolean(photo.photo_url));
};
