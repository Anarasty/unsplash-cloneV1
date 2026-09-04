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

export const getPaginationLinks = (linkHeader) => {
  const links = {};

  linkHeader?.split(",").forEach((link) => {
    const match = link.match(/<([^>]+)>;\s*rel="([^"]+)"/);

    if (match) {
      links[match[2]] = getPageFromUrl(match[1]);
    }
  });

  return links;
};

export const getPaginationPages = (links = {}) => {
  const firstPage = links.first ?? 1;
  const lastPage = links.last;

  return [firstPage, firstPage + 1, firstPage + 2].filter(
    (page) => !lastPage || page < lastPage,
  );
};
