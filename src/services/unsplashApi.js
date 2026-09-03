const UNSPLASH_BASE_URL = "https://api.unsplash.com";
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const pendingPhotoRequests = new Map();

const getPageFromUrl = (url) => {
  if (!url) {
    return null;
  }

  try {
    const page = Number(new URL(url).searchParams.get("page"));
    return Number.isInteger(page) && page > 0 ? page : null;
  } catch {
    return null;
  }
};

const getPaginationLinks = (linkHeader) => {
  const links = {};

  linkHeader?.split(",").forEach((link) => {
    const match = link.match(/<([^>]+)>;\s*rel="([^"]+)"/);

    if (match) {
      links[match[2]] = getPageFromUrl(match[1]);
    }
  });

  return links;
};

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
