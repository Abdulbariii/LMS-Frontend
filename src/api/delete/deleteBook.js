const deleteBook = async (url) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3MTQzMjkzLCJpYXQiOjE3MDY1Mzg0OTMsImp0aSI6IjJkNWZmYmU2ZDEyYzQ4OWViN2QyNDNmYmJkNmE3NjczIiwidXNlcl9pZCI6MX0._V2X9wyGbFCHBxc1aRgct384Us3HE6jjdj3QbQrFnWQ`,
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

export default deleteBook;
