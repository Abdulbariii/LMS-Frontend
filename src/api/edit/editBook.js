const editBook = async (bookId, updatedBookData) => {
  const accessToken = localStorage.getItem("access");
  let response;
  let headerContent;

  if (typeof updatedBookData !== "string") {
    headerContent = {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    };
  } else {
    headerContent = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  try {
    response = await fetch(`http://127.0.0.1:8000/api/books/${bookId}/`, {
      method: "PATCH",
      headers: headerContent,
      body: updatedBookData,
    });

    if (!response.ok) {
      throw new Error("Failed to edit book. Network response was not ok.");
    }
  } catch (error) {
    console.error("Error editing book:", error);
  }

  return response;
};
export default editBook;
