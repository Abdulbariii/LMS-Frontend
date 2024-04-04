export const deleteBook = async (url) => {
  const accessToken = localStorage.getItem("access");

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 204) {
      console.log("Successfully deleted the book.");
    } else if (response.status === 404) {
      console.error("Book not found.");
    } else if (response.status === 401) {
      console.error("Unauthorized: Check your token.");
    } else {
      console.error(
        `Failed to delete the book. Status code: ${response.status}`
      );
    }
  } catch (error) {
    console.error("An error occurred while deleting the book:", error);
  }
};
