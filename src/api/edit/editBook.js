const editBook = async (bookId, updatedBookData) => {
  console.log(updatedBookData,'haha')
  const accessToken = localStorage.getItem("access");
  let response;

  try {
    // const formData = new FormData();
    // formData.append("cover_image", updatedBookData.cover_image);
    // formData.append("title", updatedBookData.title);




    response = await fetch(`http://127.0.0.1:8000/api/books/${bookId}/`, {
      method: "PATCH", // or 'PATCH' depending on your API's requirements
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(updatedBookData),
      // body:formData for image
    });

    if (!response.ok) {
      throw new Error("Failed to edit book. Network response was not ok.");
    }

    // Optionally, handle response data if needed

    // You may want to update your local state or refetch the book data
    // For simplicity, assuming you have a function to fetch all books
    // fetchBooks();
  } catch (error) {
    console.error("Error editing book:", error);
    // Handle error as needed, e.g., display an error message to the user
  }

  return response;
};
export default editBook;
