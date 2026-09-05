import { getPaginationLinks } from "./pagination";

const UNSPLASH_BASE_URL = "https://api.unsplash.com";
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const pendingSearchRequests = new Map();

export const searchPhotos = ({ query, page = 1, perPage = 20 } = {}) => {
  const searchQuery = query?.trim();

  if (!searchQuery) {
    throw new Error("Enter a search term.");
  }

  if (!UNSPLASH_ACCESS_KEY) {
    throw new Error("Missing VITE_UNSPLASH_ACCESS_KEY in .env");
  }

  const params = new URLSearchParams({
    query: searchQuery,
    page: String(page),
    per_page: String(perPage),
  });
  const endpoint = `${UNSPLASH_BASE_URL}/search/photos?${params}`;
  const pendingRequest = pendingSearchRequests.get(endpoint);

  if (pendingRequest) {
    return pendingRequest;
  }

  const request = fetch(endpoint, {
    headers: {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    },
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error(`Unsplash search failed: ${response.status}`);
    }

    const data = await response.json();
    const results = Array.isArray(data.results) ? data.results : [];
    const pagination = getPaginationLinks(response.headers.get("Link"));

    if (Number.isInteger(data.total_pages) && data.total_pages > 0) {
      pagination.first = 1;
      pagination.last = data.total_pages;
      pagination.prev = page > 1 ? page - 1 : null;
      pagination.next = page < data.total_pages ? page + 1 : null;
    }

    return {
      photos: results
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
      pagination,
      total: data.total ?? 0,
    };
  });

  pendingSearchRequests.set(endpoint, request);
  request.then(
    () => pendingSearchRequests.delete(endpoint), // ok
    () => pendingSearchRequests.delete(endpoint), // not ok
  );

  return request;
};
