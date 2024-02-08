const editBook = async (bookId, updatedBookData) => {

  console.log(updatedBookData)
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${bookId}/`, {
        method: 'PUT', // or 'PATCH' depending on your API's requirements
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3MTQzMjkzLCJpYXQiOjE3MDY1Mzg0OTMsImp0aSI6IjJkNWZmYmU2ZDEyYzQ4OWViN2QyNDNmYmJkNmE3NjczIiwidXNlcl9pZCI6MX0._V2X9wyGbFCHBxc1aRgct384Us3HE6jjdj3QbQrFnWQ`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedBookData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to edit book. Network response was not ok.');
      }
  
      // Optionally, handle response data if needed
      const responseData = await response.json();
      console.log('Edited book:', responseData);
  
      // You may want to update your local state or refetch the book data
      // For simplicity, assuming you have a function to fetch all books
      // fetchBooks();
    } catch (error) {
      console.error('Error editing book:', error);
      // Handle error as needed, e.g., display an error message to the user
    }
  };
export default editBook  