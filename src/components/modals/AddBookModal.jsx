import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Select,
  Box,
  MenuItem,
  InputLabel,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useSubmit } from "react-router-dom";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function AddBookModal({ showAdd, setShowAdd, loading }) {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    publication_date: "",
    is_booked: false,
    cover_image: null,
    category_name: null,
    category: "",
    book_code: "",
    publisher: "",
    published_place: "",
    page_number: "",
    dewey_decimal_number: "",
    dewey_decimal_category_range: "",
    updated_by: "",
    added_by: localStorage.getItem("userId"),
  });

  const submit = useSubmit();

  const handleClose = () => {
    setShowAdd(false);
  };

  const handleAdd = async () => {
    const formDataNew = new FormData();

    try {
      for (const key in newBook) {
        if (Object.prototype.hasOwnProperty.call(newBook, key)) {
          const apiFieldName =
            key === "publicationDate" ? "publication_date" : key;
          formDataNew.append(apiFieldName, newBook[key]);
        }
      }
      formDataNew.append("cover_image", newBook.cover_image);
    } catch (err) {
      console.log(err);
    }

    submit(formDataNew, {
      method: "POST",
      action: ".",
      encType: "multipart/form-data",
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    console.log(typeof value);
    const fieldValue =
      type === "checkbox" ? checked : type === "file" ? files[0] : value;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: fieldValue,
    }));
  };

  const genreOptions = [
    { id: 11, name: "Journal" },
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
    setNewBook((prevState) => ({
      ...prevState,
      genre: e.target.value,
    }));
  };

  return (
    <React.Fragment>
      <Dialog
        maxWidth="lg"
        open={showAdd}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: 3,
            alignItems: "flex-start",
          }}
        >
          <TextField
            sx={{ borderRadius: "8px", width: "45%" }}
            autoFocus
            margin="dense"
            id="book_code"
            label="Book code"
            type="number"
            fullWidth
            name="book_code"
            value={newBook.book_code}
            onChange={handleChange}
          />
          <TextField
            sx={{ borderRadius: "8px", width: "45%" }}
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            name="title"
            value={newBook.title}
            onChange={handleChange}
          />
          <TextField
            sx={{ borderRadius: "8px", width: "45%" }}
            margin="dense"
            id="author"
            label="Author"
            type="text"
            fullWidth
            name="author"
            value={newBook.author}
            onChange={handleChange}
          />
          <TextField
            sx={{ borderRadius: "8px", width: "45%" }}
            autoFocus
            margin="dense"
            id="page_number"
            label="Page number"
            type="number"
            fullWidth
            name="page_number"
            value={newBook.page_number}
            onChange={handleChange}
          />
          <TextField
            sx={{ borderRadius: "8px", width: "45%" }}
            autoFocus
            margin="dense"
            id="publisher"
            label="Publisher"
            type="text"
            fullWidth
            name="publisher"
            value={newBook.publisher}
            onChange={handleChange}
          />
          <TextField
            sx={{ borderRadius: "8px", width: "45%" }}
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
          <TextField
            sx={{ borderRadius: "8px", width: "45%" }}
            margin="dense"
            id="publication_date"
            // label="dd/mm/yy"
            type="date"
            fullWidth
            name="publication_date"
            value={newBook.publication_date}
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
              sx={{
                bgcolor: "#fff",
                borderRadius: "3px",
                width: "520px",
              }}
              labelId="demo"
              id="select-standard"
              label="Genre"
              value={newBook.genre}
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
            sx={{ borderRadius: "8px", width: "45%" }}
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
            sx={{ borderRadius: "8px", width: "45%" }}
            margin="dense"
            id="dewey_decimal_category_range"
            label="Dewey decimal category range"
            type="text"
            fullWidth
            name="dewey_decimal_category_range"
            value={newBook.dewey_decimal_category_range}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="cover_image"
            sx={{ borderRadius: "8px", width: "45%" }}
            // label="Cover Image URL"
            type="file"
            fullWidth
            name="cover_image"
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newBook.is_booked}
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
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
