const addBook = async (newBook) => {
  // eslint-disable-next-line no-unused-vars, react-hooks/rules-of-hooks
  let response;
  let headerContent;
  const accessToken = localStorage.getItem("access");
  console.log(newBook.digital_cover);

  if (newBook.digital_image) {
    headerContent = {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  } else {
    headerContent = {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    };
  }

  try {
    response = await fetch("http://127.0.0.1:8000/api/books/", {
      method: "POST",
      headers: headerContent,
      body: newBook.digital_image ? JSON.stringify(newBook) : newBook,
    });
  } catch (error) {
    // setError(error);
    console.log(error);
  }

  return response;
};

export default addBook;
