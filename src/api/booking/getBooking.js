export const getBooking = async (url) => {
  const response = await fetch(url);

  if (response.status !== 200) throw response;

  return response.json();
};
