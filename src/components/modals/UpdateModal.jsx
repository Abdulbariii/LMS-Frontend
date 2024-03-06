import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSubmit, useNavigation } from "react-router-dom";
import {
  Select,
  MenuItem,
  InputLabel,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
export default function UpdateModal({ showEdit, setShowEdit, bookId }) {
  const [updatedBook, setUpdatedBook] = useState({
    title: "",
    author: "",
    genre: "",
    publication_date: "",
    is_booked: false,
    cover_image: null,
    category_name: null,
  });

  function extractPathFromURL(url) {
    // Find the index of "media/books/covers/" in the URL
    const startIndex = url.indexOf("media/books/covers/");
    if (startIndex !== -1) {
      // Extract the path starting from "media/books/covers/"
      const path = url.substring(startIndex);
      return path;
    } else {
      // If "media/books/covers/" is not found in the URL, return the original URL
      return url;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (showEdit) {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/books/${bookId}/`
          );
          if (response.ok) {
            const data = await response.json();
            // Update the state with the fetched data
            setUpdatedBook(data);
          } else {
            console.error("Failed to fetch book data");
          }
        } catch (error) {
          console.error("Error fetching book data:", error);
        }
      }
    };

    fetchData();
  }, [showEdit, bookId]);

  const submit = useSubmit();
  const navigation = useNavigation();

  const handleClose = () => {
    setShowEdit(false);
  };

  const handleUpdate = async () => {
    const formDataNew = new FormData();

    try {
      for (const key in updatedBook) {
        if (Object.prototype.hasOwnProperty.call(updatedBook, key)) {
          const apiFieldName =
            key === "publicationDate" ? "publication_date" : key;
          formDataNew.append(apiFieldName, updatedBook[key]);
        }
      }
      if (typeof updatedBook.cover_image !== "string") {
        formDataNew.append("cover_image", updatedBook.cover_image);
      } else {
        const urlImage = extractPathFromURL(updatedBook.cover_image);
        formDataNew.append("cover_image", urlImage);
      }

      formDataNew.append("id", bookId);
    } catch (err) {
      console.log(err);
    }

    try {
      //   await editBook(`http://127.0.0.1:8000/api/books/${bookId}/`, updatedBook);

      if (typeof updatedBook.cover_image !== "string") {
        submit(formDataNew, {
          method: "PUT",
          action: ".",
          encType: "multipart/form-data",
        });
      } else {
        submit(formDataNew, {
          method: "PUT",
          action: ".",
        });
      }
    } catch (error) {
      console.error("Error updating book:", error);
      // Handle error as needed
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const fieldValue =
      type === "checkbox" ? checked : type === "file" ? files[0] : value;
    setUpdatedBook((prevBook) => ({
      ...prevBook,
      [name]: fieldValue,
    }));
  };

  const genreOptions = [
    { id: 1, name: "Science" },
    { id: 2, name: "Law" },
    { id: 3, name: "Medicine" },
    { id: 4, name: "Mathematics" },
    { id: 5, name: "History" },
    { id: 6, name: "Literature" },
    { id: 7, name: "Engineering" },
    { id: 8, name: "Computer Science" },
    { id: 9, name: "Psychology" },
    { id: 10, name: "Economics" },
  ];

  const handleGenreOption = (e) => {
    setUpdatedBook((prevState) => ({
      ...prevState,
      genre: e.target.value,
    }));
  };

  console.log(updatedBook);

  return (
    <React.Fragment>
      <Dialog
        open={showEdit}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Book</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            name="title"
            value={updatedBook.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="author"
            label="Author"
            type="text"
            fullWidth
            name="author"
            value={updatedBook.author}
            onChange={handleChange}
          />
          <Box>
            <InputLabel
              sx={{
                fontSize: "12px",
                color: "000",
              }}
              id="demo"
            >
              Genre
            </InputLabel>
            <Select
              variant="outlined"
              fullWidth
              sx={{ bgcolor: "#fff", borderRadius: "8px" }}
              labelId="demo"
              id="demo-simple-select-standard"
              label="Genre"
              size="small"
              value={updatedBook.genre}
              onChange={handleGenreOption}
            >
              {genreOptions.map((option) => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <TextField
            margin="dense"
            id="publication_date"
            // label="Publication Date"
            type="date"
            fullWidth
            name="publication_date"
            value={updatedBook.publication_date}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="cover_image"
            // label="Cover Image URL"
            type="file"
            fullWidth
            name="cover_image"
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={updatedBook.is_booked}
                onChange={handleChange}
                name="is_booked"
              />
            }
            label="Is Booked"
          />
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

          <Button
            onClick={handleUpdate}
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
            {navigation.state === "submitting" ? (
              <CircularProgress color="inherit" size={"25px"} />
            ) : (
              <Typography variant="caption"> Update </Typography>
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
