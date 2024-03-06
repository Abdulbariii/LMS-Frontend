const addBook = async (newBook) => {
  // eslint-disable-next-line no-unused-vars, react-hooks/rules-of-hooks
  let response;
  try {
    const accessToken = localStorage.getItem("access");
    response = await fetch("http://127.0.0.1:8000/api/books/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      body: newBook,
    });
  } catch (error) {
    // setError(error);
    console.log(error);
  }

  return response;
};

export default addBook;
