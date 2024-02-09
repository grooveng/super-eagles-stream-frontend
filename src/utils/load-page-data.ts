export const loadPageData = async (fileName: string) => {
  const url = `${process.env.NEXT_PUBLIC_MAIN_WEBSITE_URL}/data/${fileName}`;
  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
};
