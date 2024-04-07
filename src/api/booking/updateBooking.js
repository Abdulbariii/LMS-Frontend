const updateBooking = async (bookingId, bookingData) => {
  const accessToken = localStorage.getItem("access");
  let response;

  try {
    response = await fetch(`http://127.0.0.1:8000/api/booking/${bookingId}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error("Failed to edit book. Network response was not ok.");
    }
  } catch (error) {
    console.error("Error editing book:", error);
  }

  return response;
};
export default updateBooking;
