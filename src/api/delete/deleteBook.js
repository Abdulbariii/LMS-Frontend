const deleteBook = async (url) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNssI6IjE2OTkyMTMzNTAsImp0aSI6IjY3MTdjMzY0ZmEyNDQwNTA5MTE0NTE4MjhhOWExZDM3IiwidXNlcl9pZCI6MX0.DPn0uPC7xzgBwBgJ6o_iUIKqlgH-zISPg13BESBMb1I`,
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
