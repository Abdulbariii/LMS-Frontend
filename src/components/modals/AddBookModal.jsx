import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddBook from "../../api/Post/addBook";

// eslint-disable-next-line react/prop-types
export default function AddBookModal({ showAdd, setShowAdd }) {
  const [newBook, setNewBook] = React.useState({
    title: "",
    author: "",
    genre: "",
    publication_date: "",
    is_booked: false,
    cover_image: null,
    category_name: null,
  });

  const handleClose = () => {
    setShowAdd(false);
  };

  const handleAdd = async () => {
    try {
      await AddBook(newBook, setNewBook);

      handleClose();
    } catch (error) {
      console.error("Error adding book:", error);
      // Handle error as needed
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

  return (
    <React.Fragment>
      <Dialog
        open={showAdd}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add Book</DialogTitle>
        <DialogContent>
          <TextField
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
            margin="dense"
            id="genre"
            label="Genre"
            type="text"
            fullWidth
            name="genre"
            value={newBook.genre}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="publication_date"
            // label="dd/mm/yy"
            type="date"
            fullWidth
            name="publication_date"
            value={newBook.publication_date}
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
                checked={newBook.is_booked}
                onChange={handleChange}
                name="is_booked"
              />
            }
            label="Is Booked"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
