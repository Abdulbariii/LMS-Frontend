/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography, CircularProgress, TextField, Box } from "@mui/material";
import { useSubmit } from "react-router-dom";
import { useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

// eslint-disable-next-line react/prop-types
export default function AddBookByGlobalSearch({
  showAddGlobal,
  setShowAddGlobal,
  loading,
}) {
  const [newBook, setNewBook] = useState({
    is_booked: false,
    cover_image: null,
    published_place: "",
    dewey_decimal_number: "",
    dewey_decimal_category_range: "",
    number_of_copies: "",
  });

  const [searchValue, setSearchValue] = useState();
  const [books, setBooks] = useState();
  const [showInputs, setShowInputs] = useState(false);
  const [bookDetail, setBookDetail] = useState();
  const [booksIndex, setBooksIndex] = useState(10);

  const submit = useSubmit();

  const handleClose = () => {
    setShowAddGlobal(false);
  };

  const handleAdd = async () => {
    console.log(newBook);
    const digitalBook = {
      title: bookDetail.volumeInfo.title,
      author: `${bookDetail.volumeInfo.authors.map((author) => author)}`,
      genre: bookDetail.volumeInfo.categories[0],
      publication_date: bookDetail.volumeInfo.publishedDate,
      is_booked: false,
      cover_image: "",
      category_name: null,
      category: "",
      book_code: bookDetail.volumeInfo.industryIdentifiers[0].identifier,
      publisher: bookDetail.volumeInfo.publisher,
      published_place: newBook.published_place,
      page_number: bookDetail.volumeInfo.printedPageCount,
      dewey_decimal_number: newBook.dewey_decimal_number,
      dewey_decimal_category_range: newBook.dewey_decimal_category_range,
      updated_by: null,
      number_of_copies: newBook.number_of_copies,
      added_by: localStorage.getItem("userId"),
      digital_image:
        bookDetail.volumeInfo.imageLinks.thumbnail.concat("&fife=w700-h1000"),
    };

    submit(digitalBook, {
      method: "POST",
      action: ".",
    });
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = async () => {
    setShowInputs(false);
    setBookDetail({});
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&&startIndex=${booksIndex}`
      );
      const dataJson = await response.json();
      if (dataJson) {
        setBooks(dataJson.items);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const fieldValue =
      type === "checkbox" ? checked : type === "file" ? files[0] : value;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: fieldValue,
    }));
  };

  const handleBookClick = async (bookSelfLink) => {
    console.log(bookSelfLink);
    try {
      const response = await fetch(bookSelfLink);
      const dataJson = await response.json();
      if (dataJson) {
        setBookDetail(dataJson);
      }
    } catch (err) {
      console.error(err);
    }
    setShowInputs(true);
  };
  console.log(bookDetail);
  return (
    <React.Fragment>
      <Dialog
        maxWidth="lg"
        open={showAddGlobal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {" "}
          <Typography variant="h4" sx={{ mb: 2 }}>
            Search for book globaly
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            minWidth: "1100px",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            gap: 3,
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Button
              onClick={handleSearchClick}
              sx={{ width: "5%", height: "150%", mt: 1 }}
            >
              <SearchRoundedIcon fontSize="large" />
            </Button>
            <TextField
              onChange={handleSearch}
              value={searchValue}
              label="Search"
              sx={{ width: "400px", mb: "8x" }}
              id="standard-basic"
              variant="standard"
            />
          </Box>

          {!showInputs && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                alignItems: "flex-start",

                gap: 5,
              }}
            >
              {books &&
                books.map((book) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      gap: 1,
                      maxWidth: "100px",
                    }}
                    key={book.id}
                  >
                    <Button
                      onClick={() => handleBookClick(book.selfLink)}
                      sx={{ width: "100px", height: "110px", mb: 2, mt: 2 }}
                    >
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "3px",
                        }}
                        src={
                          book.volumeInfo.imageLinks &&
                          book.volumeInfo.imageLinks.thumbnail.concat(
                            "&fife=w700-h1000"
                          )
                        }
                        alt="Book Cover"
                      />
                    </Button>

                    <Typography variant="caption">
                      {" "}
                      <strong>{book.volumeInfo.title}</strong>
                    </Typography>
                  </Box>
                ))}
            </Box>
          )}
          {books && !showInputs && (
            <Button
              onClick={() => {
                setBooksIndex((prev) => 10 + prev), handleSearchClick();
              }}
              variant="outline"
            >
              See more ...
            </Button>
          )}

          {showInputs && bookDetail && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "flex-start",
                gap: 4,
              }}
            >
              <Box sx={{ width: 160, height: 230 }}>
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "3px",
                  }}
                  src={
                    bookDetail.volumeInfo.imageLinks &&
                    bookDetail.volumeInfo.imageLinks.thumbnail.concat(
                      "&fife=w700-h1000"
                    )
                  }
                  alt="Book Cover"
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Typography sx={{ m: 1 }} variant="h5">
                  Title: <strong>{bookDetail.volumeInfo.title}</strong>
                </Typography>
                <Typography sx={{ m: 1 }} variant="h5">
                  Book code:{" "}
                  <strong>
                    {bookDetail.volumeInfo.industryIdentifiers[0].identifier}
                  </strong>
                </Typography>
                <Typography sx={{ m: 1 }} variant="h5">
                  Authors:{" "}
                  <strong>
                    {bookDetail.volumeInfo.authors.map((author) => author)}
                  </strong>
                </Typography>
                <Typography sx={{ m: 1 }} variant="h5">
                  Genre: <strong>{bookDetail.volumeInfo.categories[0]}</strong>
                </Typography>
                <Typography sx={{ m: 1 }} variant="h5">
                  Language: <strong>{bookDetail.volumeInfo.language}</strong>
                </Typography>
                <Typography sx={{ m: 1 }} variant="h5">
                  Page number:{" "}
                  <strong>{bookDetail.volumeInfo.printedPageCount}</strong>
                </Typography>
                <Typography sx={{ m: 1 }} variant="h5">
                  Publication date:{" "}
                  <strong>{bookDetail.volumeInfo.publishedDate}</strong>
                </Typography>
                <Typography sx={{ m: 1 }} variant="h5">
                  Publisher: <strong>{bookDetail.volumeInfo.publisher}</strong>
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  flexWrap: "wrap",
                }}
              >
                <TextField
                  margin="dense"
                  id="number_of_copies"
                  sx={{ borderRadius: "8px" }}
                  type="number"
                  label="Number of copies"
                  fullWidth
                  name="number_of_copies"
                  value={newBook.number_of_copies}
                  onChange={handleChange}
                />
                <TextField
                  sx={{ borderRadius: "8px" }}
                  margin="dense"
                  id="dewey_decimal_number"
                  label="Dewey decimal number"
                  type="text"
                  fullWidth
                  name="dewey_decimal_number"
                  value={newBook.dewey_decimal_number}
                  onChange={handleChange}
                />
                <TextField
                  sx={{ borderRadius: "8px" }}
                  margin="dense"
                  id="dewey_decimal_category_range"
                  label="Dewey decimal cut"
                  type="text"
                  fullWidth
                  name="dewey_decimal_category_range"
                  value={newBook.dewey_decimal_category_range}
                  onChange={handleChange}
                />
                <TextField
                  sx={{ borderRadius: "8px" }}
                  autoFocus
                  margin="dense"
                  id="published_place"
                  label="Published place"
                  type="text"
                  fullWidth
                  name="published_place"
                  value={newBook.published_place}
                  onChange={handleChange}
                />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              bgcolor: "#fff",
              height: "35px",
              borderRadius: "8px",
              width: "85px",
              mr: "5px",
              color: "text.main",
              ":hover": {
                bgcolor: "#f0fff0", // theme.palette.primary.main
              },
            }}
          >
            <Typography variant="caption">Cancel</Typography>
          </Button>

          {showInputs && (
            <Button
              onClick={handleAdd}
              variant="outlined"
              sx={{
                bgcolor: "#fff",
                height: "35px",
                borderRadius: "8px",
                width: "85px",
                mr: "5px",
                color: "text.main",
                ":hover": {
                  bgcolor: "#f0fff0", // theme.palette.primary.main
                },
              }}
            >
              {loading === "submitting" ? (
                <CircularProgress color="inherit" size={"25px"} />
              ) : (
                <Typography variant="caption"> Add </Typography>
              )}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
