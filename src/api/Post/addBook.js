const addBook = async (newBook) => {
  // eslint-disable-next-line no-unused-vars, react-hooks/rules-of-hooks
  try {
    const formData = new FormData();

    for (const key in newBook) {
      if (Object.prototype.hasOwnProperty.call(newBook, key)) {
        const apiFieldName =
          key === "publicationDate" ? "publication_date" : key;
        formData.append(apiFieldName, newBook[key]);
      }
    }

    if (newBook.coverImage !== null) {
      formData.append("coverImage", newBook.coverImage);
    }

    console.log("FormData before sending:", formData);
    console.log(newBook);
    const accessToken = localStorage.getItem("access");
    const response = await fetch("http://127.0.0.1:8000/api/books/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    // setError(error);
    console.log(error);
  }
};

export default addBook;
